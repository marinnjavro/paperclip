require 'open-uri'

module Llm
  class CogsFromUrl
    include HTTParty
    base_uri 'https://api.anthropic.com/v1'

    IMAGE_DOWNLOAD_TIMEOUT = 10 # seconds

    attr_reader :current_user, :url, :guidance, :settings, :web_content, :prompt_trail

    def initialize(current_user, url, guidance = nil, settings = {})
      @current_user = current_user
      @url = url
      @guidance = guidance.presence
      @settings = settings || {}
      @web_content = WebContentExtractor.new(url).extract
      @prompt_trail = PromptTrail.new
    end

    def generate
      data = call_claude
      prompt_trail.response = data
      cog = data&.dig('cog') || data

      # Collect cards that need images (card record + image index)
      cards_needing_images = []

      ActiveRecord::Base.transaction do
        created_cog = Cog.create!(
          name: cog['name'],
          tags: cog['tags'],
          description: cog['description'],
          user_id: current_user.id
        )
        @created_cog = created_cog

        blocks = cog&.dig('blocks') || []
        blocks.each do |block|
          created_block = Block.create!(
            name: block['name'],
            cog_id: created_cog.id,
            position: block['position']
          )

          cards = block&.dig('cards') || []
          cards.each do |card|
            card_type = card['position'] == 1 ? 'opening' : (card['card_type'] || 'media and text')

            created_card = Card.create!(
              block_id: created_block.id,
              card_type: card_type,
              name: card['name'],
              text: card['text'],
              position: card['position'],
              actions: card['actions']
            )

            # Track cards that Claude assigned an image to
            if card['image_index'].present? && card['image_index'].is_a?(Integer)
              cards_needing_images << { card: created_card, image_index: card['image_index'] }
            end
          end
        end

        prompt_trail.object_type = 'Cog'
        prompt_trail.object_id = created_cog.id
        prompt_trail.save!
      end

      # Attach images AFTER the transaction — a failed download won't roll back the Cog
      attach_images(cards_needing_images)
      attach_cover_photo

      @created_cog
    end

    private

    def call_claude
      api_key = ENV['ANTHROPIC_API_KEY']
      raise "Anthropic API key not configured. Set ANTHROPIC_API_KEY environment variable." unless api_key.present?

      prompt = build_prompt

      # Log the prompt for debugging
      prompt_trail.question = prompt

      response = self.class.post('/messages', {
        headers: {
          'Content-Type' => 'application/json',
          'x-api-key' => api_key,
          'anthropic-version' => '2023-06-01'
        },
        body: {
          model: 'claude-sonnet-4-20250514',
          max_tokens: 4096,
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ]
        }.to_json,
        timeout: 120
      })

      unless response.success?
        error_msg = response.parsed_response&.dig('error', 'message') || "Claude API error (#{response.code})"
        raise error_msg
      end

      # Extract text from Claude's response
      raw_text = response.parsed_response&.dig('content', 0, 'text')
      raise "Empty response from Claude" if raw_text.blank?

      # Parse JSON from the response (Claude may wrap it in markdown code blocks)
      json_text = raw_text.gsub(/\A```json\s*/, '').gsub(/\s*```\z/, '').strip
      JSON.parse(json_text)
    rescue JSON::ParserError => e
      # Try to extract JSON from the response if it has extra text around it
      if json_match = raw_text&.match(/\{[\s\S]*\}/)
        JSON.parse(json_match[0])
      else
        raise "Could not parse the generated content. Please try again."
      end
    end

    def attach_images(cards_needing_images)
      available_images = web_content.images
      return if available_images.empty? || cards_needing_images.empty?

      # Track which image indices we successfully downloaded (to avoid re-downloading for cover)
      @downloaded_images = {}

      cards_needing_images.each do |entry|
        card = entry[:card]
        idx = entry[:image_index] - 1 # Claude uses 1-based index
        next if idx < 0 || idx >= available_images.length

        image_url = available_images[idx]
        begin
          sleep(0.5) # Small delay to avoid rate limiting from source websites
          io = URI.open(image_url, open_timeout: IMAGE_DOWNLOAD_TIMEOUT, read_timeout: IMAGE_DOWNLOAD_TIMEOUT)
          extension = File.extname(URI.parse(image_url).path).presence || '.jpg'
          card.photo.attach(io: io, filename: "#{card.id}#{extension}")
          @downloaded_images[idx] = true
          Rails.logger.info "[CogsFromUrl] Attached image #{idx + 1} to card #{card.id}"
        rescue => e
          Rails.logger.warn "[CogsFromUrl] Failed to download image #{image_url}: #{e.message}"
          # Silent failure — the card still exists, just without a photo
        end
      end
    end

    def attach_cover_photo
      available_images = web_content.images
      return if available_images.empty? || @created_cog.nil?

      # Use the first available image as the Cog cover
      image_url = available_images.first
      begin
        sleep(0.5) # Small delay to avoid rate limiting
        io = URI.open(image_url, open_timeout: IMAGE_DOWNLOAD_TIMEOUT, read_timeout: IMAGE_DOWNLOAD_TIMEOUT)
        extension = File.extname(URI.parse(image_url).path).presence || '.jpg'
        @created_cog.photo.attach(io: io, filename: "cog_#{@created_cog.id}#{extension}")
        Rails.logger.info "[CogsFromUrl] Attached cover photo to cog #{@created_cog.id}"
      rescue => e
        Rails.logger.warn "[CogsFromUrl] Failed to attach cover photo: #{e.message}"
      end
    end

    def build_mixer_instructions
      parts = []

      case settings[:length]
      when 'high'
        parts << "LENGTH — EXTENSIVE: Write rich, detailed cards with 4-5 sentences each. Include extra context, examples, and nuance. Create more cards per block to cover the topic thoroughly."
      when 'low'
        parts << "LENGTH — CONCISE: Keep cards very short — 1-2 punchy sentences maximum. Get straight to the point. Fewer cards per block, only the essentials."
      end

      case settings[:style]
      when 'high'
        parts << "STYLE — FORMAL: Use professional, polished language. Write in a structured, authoritative tone suitable for business or academic settings. Avoid contractions and casual phrasing."
      when 'low'
        parts << "STYLE — INFORMAL: Write in a casual, friendly, conversational tone. Use everyday language, contractions, and a relaxed voice — like explaining to a friend over coffee."
      end

      case settings[:teach]
      when 'high'
        parts << "TEACHING MODE — TEACHER: Assume the learner is starting from zero. Begin with the simplest foundational concepts and build up step by step. Define every term. Use analogies and 'think of it like...' comparisons. Make no assumptions about prior knowledge."
      when 'low'
        parts << "TEACHING MODE — EXPERT: Assume the learner already has strong background knowledge. Skip basic explanations and dive straight into advanced concepts, nuances, and expert-level insights. Use technical terminology freely."
      end

      case settings[:depth]
      when 'high'
        parts << "DEPTH — EXPERT ANALYSIS: Provide deep, thorough analysis. Explore underlying mechanisms, cite specific data points from the source, discuss implications, and draw connections between concepts. Prioritise depth over breadth."
      when 'low'
        parts << "DEPTH — BRIEF OVERVIEW: Keep research surface-level. Cover the main points quickly without going deep. Give the learner a broad overview they can absorb in minutes, not a detailed study."
      end

      return "" if parts.empty?

      <<~MIXER

        === MIXER SETTINGS (these override defaults) ===
        #{parts.join("\n")}
        === END MIXER SETTINGS ===
      MIXER
    end

    def build_prompt
      image_list = ""
      if web_content.images.any?
        image_entries = web_content.images.each_with_index.map { |url, i| "[#{i + 1}] #{url}" }
        image_list = <<~IMAGES

          ---
          AVAILABLE IMAGES FROM THE PAGE (use the number to assign to cards):
          #{image_entries.join("\n")}
          ---
        IMAGES
      end

      guidance_section = ""
      if guidance.present?
        guidance_section = <<~GUIDANCE

          ---
          USER GUIDANCE:
          The user has provided the following instructions for how to generate this Cog:
          "#{guidance}"
          Please follow these instructions when structuring and writing the content.
          ---
        GUIDANCE
      end

      <<~PROMPT
        You are an expert learning designer. Read the following web page content and transform it
        into a structured learning Cog (learning package).

        IMPORTANT: Base ALL content on the provided web page. Do not invent facts.

        ---
        SOURCE URL: #{url}
        PAGE TITLE: #{web_content.title}
        ---
        PAGE CONTENT:
        #{web_content.extracted_text}
        #{image_list}#{guidance_section}

        #{build_mixer_instructions}

        === INTERNAL GUIDELINES (follow these carefully) ===

        LEARNING DESIGN PRINCIPLES:
        - Structure content so foundational concepts come first, then build toward complexity. The learner should never encounter an idea that depends on something they haven't seen yet.
        - Each card should teach exactly one clear idea. If you find yourself using "also" or "additionally", that's a sign to split into a separate card.
        - Ground abstract concepts with concrete examples, numbers, or real-world connections drawn from the source material. Don't just state facts — make the learner see why it matters.
        - End each block with a card that gives the learner something to remember or act on — a key insight, a practical tip, or a thought-provoking connection.
        - Quiz questions should test genuine understanding and application, not surface-level recall. Avoid questions that can be answered by memorizing a single word or date.

        TONE & AUDIENCE ADAPTATION:
        - Default to clear, warm, conversational language. Write as if explaining to a curious colleague, not lecturing a classroom.
        - If the user's guidance mentions a specific audience (e.g. "for beginners", "for executives", "for children"), adapt vocabulary, sentence complexity, and depth accordingly throughout the entire Cog.
        - Use analogies and comparisons to make abstract or technical ideas tangible. Connect new concepts to things the learner likely already knows.
        - Avoid jargon by default. If the source content is inherently technical, explain specialised terms naturally on first use rather than assuming knowledge.

        CONTENT QUALITY STANDARDS:
        - Every card must earn its place — no filler, no repetition of what was already said. If two cards say similar things, merge them or cut one.
        - Each card's text should be self-contained: a learner should understand it without needing to read the card before or after it.
        - The Cog name should be engaging and specific — not just a topic label. "From Bean to Cup: The Journey of Coffee" is better than "Coffee Overview".
        - The description should hook curiosity in 1-2 sentences. Tell the learner what they'll gain, not just what the topic is.
        - Tags should be specific and useful for discovery. Prefer "espresso brewing", "caffeine science" over generic tags like "food" or "education".

        INTERPRETING USER GUIDANCE:
        - If the user provided guidance above, treat it as the primary directive. Restructure blocks, shift focus, and adjust tone to honour what they asked for.
        - If the guidance asks to focus on a subtopic, still include a brief contextual overview but weight the majority of content toward that subtopic.
        - If the guidance mentions an audience or difficulty level, adjust complexity, vocabulary, and depth throughout — not just in one section.
        - If the guidance is vague or brief, interpret the spirit of the request generously and use your best judgment to deliver what the user likely intended.
        - If no guidance was provided, create a well-rounded Cog that covers the source material's most important and interesting aspects.

        === END GUIDELINES ===

        Create a JSON object with EXACTLY this structure (no markdown, just raw JSON):

        {
          "cog": {
            "name": "Engaging, specific title for this learning package",
            "description": "1-2 sentence hook that tells the learner what they will gain",
            "tags": ["specific-tag-1", "specific-tag-2", "specific-tag-3"],
            "blocks": [
              {
                "name": "Introduction",
                "position": 1,
                "cards": [
                  {"name": "Welcome", "text": "One sentence that hooks the learner's curiosity", "card_type": "opening", "position": 1},
                  {"name": "Card title", "text": "2-3 sentences teaching one clear idea", "card_type": "media and text", "position": 2, "image_index": 1},
                  {"name": "Card title", "text": "2-3 sentences teaching one clear idea", "card_type": "media and text", "position": 3, "image_index": 2}
                ]
              },
              {
                "name": "Deep Dive",
                "position": 2,
                "cards": [
                  {"name": "Section intro", "text": "One sentence setting up what comes next", "card_type": "opening", "position": 1},
                  {"name": "Card title", "text": "2-3 sentences with concrete examples", "card_type": "media and text", "position": 2, "image_index": 3},
                  {"name": "Card title", "text": "2-3 sentences with concrete examples", "card_type": "media and text", "position": 3, "image_index": 4},
                  {"name": "Card title", "text": "2-3 sentences with concrete examples", "card_type": "media and text", "position": 4, "image_index": 5}
                ]
              },
              {
                "name": "Key Takeaways",
                "position": 3,
                "cards": [
                  {"name": "What to remember", "text": "One sentence framing the takeaways", "card_type": "opening", "position": 1},
                  {"name": "Card title", "text": "2-3 sentences — actionable insight or memorable connection", "card_type": "media and text", "position": 2, "image_index": 6},
                  {"name": "Card title", "text": "2-3 sentences — actionable insight or memorable connection", "card_type": "media and text", "position": 3}
                ]
              },
              {
                "name": "Test Your Knowledge",
                "position": 4,
                "cards": [
                  {"name": "Quiz Time", "text": "Let's see what stuck!", "card_type": "opening", "position": 1},
                  {
                    "name": "Quiz",
                    "text": "Answer true or false for each statement.",
                    "card_type": "action",
                    "position": 2,
                    "actions": [
                      {"question": "Statement testing understanding, not memorisation", "answer": true},
                      {"question": "Plausible but incorrect statement", "answer": false},
                      {"question": "Statement requiring the learner to apply what they learned", "answer": true}
                    ]
                  },
                  {
                    "name": "Quiz",
                    "text": "Answer true or false for each statement.",
                    "card_type": "action",
                    "position": 3,
                    "actions": [
                      {"question": "Statement testing a different concept", "answer": true},
                      {"question": "Common misconception presented as fact", "answer": false},
                      {"question": "Statement connecting two ideas from the content", "answer": true}
                    ]
                  }
                ]
              }
            ]
          }
        }

        Rules:
        - Return ONLY valid JSON. No markdown, no explanation, just the JSON object.
        - Base all facts and quiz questions on the actual web page content.
        - Keep card text concise and educational (2-4 sentences).
        - Quiz questions should test understanding and application, not surface recall.
        - Generate 3-5 specific, discoverable tags.
        - Each action card should have 3-5 true/false questions.
        - For "media and text" cards, include an "image_index" field with the number of the most relevant image from the available images list. Pick images that best illustrate the card's topic. Do NOT assign images to "opening" or "action" cards. If no images are available or none are relevant, omit the "image_index" field.
        - Try to use different images for different cards — spread them across the Cog for variety.
      PROMPT
    end
  end
end
