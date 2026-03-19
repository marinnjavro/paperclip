module Llm
  class StableDiffusion
    include HTTParty
    base_uri 'https://api.stability.ai/v2beta/stable-image/generate'

    def initialize
    end

    def generate_core(prompt)
      response = self.class.post("/core", headers: headers, body: { prompt: prompt, output_format: 'png', aspect_ratio: '5:4' }, multipart: true)
      response.body
    end

    def generate_sd3(prompt)
      response = self.class.post("/sd3", headers: headers, body: { prompt: prompt, output_format: 'png', aspect_ratio: '5:4' }, multipart: true)
      response.body
    end

    private

    def headers
      {
        "Authorization" => "Bearer #{Rails.application.credentials.dig(Rails.env.to_sym, :stable_diffusion, :secret)}",
        "Accept" => "image/*"
      }
    end
  end
end