require 'open-uri'
class GenerateDalleImageJob < ApplicationJob
  queue_as :default
  retry_on StandardError, attempts: 0

  def perform(query, card_id=nil)
    return unless Rails.env.production?
    card = Card.find(card_id)

    data = Llm::Dalle.new.generate(query)
    image = data.dig('data').first['url']
    card.photo.attach(io: URI.open(image), filename: "#{card.id}.png")
  end
end
