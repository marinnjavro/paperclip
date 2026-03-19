module Llm
  class Cogs
    include ActiveModel::Model
    #
    # Generate the completion for a given prompt
    #
    # @param prompt [String] The prompt to complete
    # @param model [String] The model to use
    #   For a list of valid parameters and values, see:

    attr_reader :current_user, :query, :provider, :prompt_trail

    def initialize(current_user, query)
      @current_user = current_user
      @query = query
      @prompt_trail = PromptTrail.new
      @provider = Cog.class_variable_get(:@@provider)
    end

    def generate
      data = ask_and_parse(text_prompt)
      prompt_trail.response = data
      cog = data&.dig('cog') || data
      ActiveRecord::Base.transaction do
        created_cog = Cog.create(name: cog['name'], tags: cog['tags'], description: cog['description'], user_id: current_user.id)
        @created_cog = created_cog
        blocks = cog&.dig('blocks')
        blocks.each do |block|
          created_block = Block.create(name: block['name'], cog_id: created_cog.id, position: block['position'])
          cards = block&.dig('cards')
          cards.each do |card|
            card_type = card['position'] == 1 ? 'opening' : 'media and text'
            card = Card.create(
              block_id: created_block.id,
              card_type: card_type,
              name: card['name'],
              text: card['text'],
              position: card['position']
            )
          end
        end
        prompt_trail.object_type = 'Cog'
        prompt_trail.object_id = created_cog.id
        prompt_trail.save!
      end
      #GenerateDalleImagesJob.perform_later(@created_cog.id)
      @created_cog
    end

    def ask_and_parse(prompt)
      ask(question: prompt)
    rescue Langchain::OutputParsers::OutputParserException, JSON::ParserError => e
      raise "Can't generate Cog rephrase the question or try again later."
    end

    def ask(question:, k: 4, &block)
      ActiveRecord::Base.logger.silence do
        search_results = provider.similarity_search(query: query, k: k)

        context = search_results.map do |result|
          result.as_vector
        end
        context = context.join("\n---\n")

        parser = Langchain::OutputParsers::StructuredOutputParser.from_json_schema(template_json_schema)
        prompt = Langchain::Prompt::PromptTemplate.new(template: question, input_variables: ["query", "context", "format_instructions"])

        generated_prompt = prompt.format(
          query: query,
          context: context,
          format_instructions: parser.get_format_instructions
        )

        prompt_trail.question = generated_prompt

        messages = [
          {
            role: "user",
            content: generated_prompt
          }
        ]
        llm_response = provider.llm.chat(messages: messages, &block)

        begin
          parsed_response = parser.parse(llm_response.chat_completion)
        rescue Langchain::OutputParsers::OutputParserException => e
          fix_parser = Langchain::OutputParsers::OutputFixingParser.from_llm(
            llm: provider.llm,
            parser: parser
          )
          return fix_parser.parse(llm_response.chat_completion)
        end

        parsed_response
      end
    end

    def text_prompt
      <<~TEXT
        Context:
        {context}
        ---
        Question:
        #{CustomPrompt.find_by(name: self.class.to_s).content}
        ---
        Answer:
      TEXT
    end

    def text_prompt_test
      <<~TEXT
        Context:
        {context}
        ---
        Question: You are a university professor and expert skilled in summarizing and creating content.
        You have been provided with guidelines on how to create the cog in JSON format:
        {{
          "cog": "Every single cog is a media project, which consists of Blocks. Every block, in turn, consists of one or more Cards. It consist of name, description, tags, and blocks.",
          "blocks": "A Logical block or simply a Block is a basic cog's structure element. A block consists of one or more cards, which are organised as follows:
          Block opening card. This card is being created automatically for each given block, but can be deleted by a content creator later on. Main horizontal storyline.
          That’s a number of cards (of any type) put in certain order. It consist of short name, position, and cards.",
          "cards": "Card is an atomic piece of content it is an adaptive piece which can combine text and an image. It consist of short name, text, position, and type ('opening', 'media and text')."
        }}
        {format_instructions}
        Based on this data, use your creative skills to create an ideal cog about with the similar cog name: {query}.
        Cog should be composed of four blocks and cards in each block.
        Four blocks should be built with this taxonomy:
        1. Introduction to the Concept: Introduction to new ideas and basic principles.
        2. Problematics: Identification and understanding of related challenges.
        3. Resolution: Application of knowledge to solve identified challenges.
        4. Test Knowledge: Evaluation of learner's understanding and knowled
        Avoid using sample data or repeating themes.
        The 'opening' card type should always be the first card in a block.
        ---
        Answer:
      TEXT
    end

    def template_json_schema
      {
        "type": "object",
        "properties": {
          "cog": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "description": {
                "type": "string"
              },
              "tags": {
                "type": "array",
                "items": [
                  {
                    "type": "string"
                  },
                  {
                    "type": "string"
                  }
                ]
              },
              "blocks": {
                "type": "array",
                "items": [
                  {
                    "type": "object",
                    "properties": {
                      "name": {
                        "type": "string"
                      },
                      "position": {
                        "type": "integer"
                      },
                      "cards": {
                        "type": "array",
                        "items": [
                          {
                            "type": "object",
                            "properties": {
                              "name": {
                                "type": "string"
                              },
                              "text": {
                                "type": "string"
                              },
                              "card_type": {
                                "type": "string"
                              },
                              "position": {
                                "type": "integer"
                              }
                            },
                            "required": [
                              "name",
                              "card_type",
                              "position"
                            ]
                          }
                        ]
                      }
                    },
                    "required": [
                      "name",
                      "position",
                      "cards"
                    ]
                  }
                ]
              }
            },
            "required": [
              "name",
              "description",
              "tags",
              "blocks"
            ]
          }
        },
        "required": [
           "cog"
       ]
      }
    end
  end
end