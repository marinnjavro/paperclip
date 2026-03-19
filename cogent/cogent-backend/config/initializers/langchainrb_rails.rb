# frozen_string_literal: true
LangchainrbRails.configure do |config|
  config.vectorsearch = Langchain::Vectorsearch::Pgvector.new(
    # llm: Langchain::LLM::Ollama.new(
    #   url: 'http://localhost:11434',
    #   default_options: {
    #     completion_model_name: "llama3",
    #     embeddings_model_name: "llama3",
    #     chat_completion_model_name: "llama3"
    #   }
    # )
    llm: Langchain::LLM::OpenAI.new(
      api_key: Rails.application.credentials.dig(Rails.env.to_sym, :openai, :secret),
      default_options: { embeddings_model_name: "text-embedding-3-large", chat_completion_model_name: "gpt-4o-mini" }
    )
  )
end
