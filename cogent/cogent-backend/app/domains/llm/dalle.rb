# app/domains/llm/openai_service.rb
module Llm
  class Dalle
    include HTTParty
    base_uri 'https://api.openai.com/v1/images'

    def initialize
    end

    def generate(prompt)
      prompt_body = CustomPrompt.find_by(name: self.class.to_s).content #.as_json
      json_body = JSON.parse(prompt_body)
      json_body["prompt"] = prompt
      response = self.class.post("/generations", headers: headers, body: json_body.to_json)
      JSON.parse(response.body)
    end
    private
    def headers
      {
        "Content-Type" => "application/json",
        "Authorization" => "Bearer #{Rails.application.credentials.dig(Rails.env.to_sym, :openai, :secret)}"
      }
    end
  end
end

