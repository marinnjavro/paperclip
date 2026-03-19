require 'open-uri'
class GenerateDalleImagesJob < ApplicationJob
  queue_as :default
  retry_on StandardError, attempts: 0

  def perform(cog_id, query = nil)
    return unless Rails.env.production?
    cog = Cog.find(cog_id)

    cog.cards.find_each(batch_size: 10) do |card|
      data = Llm::Dalle.new.generate(card.name)
      image = data.dig('data').first['url']
      card.photo.attach(io: URI.open(image), filename: "#{card.id}.png")
    end
  end
end
