require 'open-uri'
class GenerateStableDiffusionImageJob < ApplicationJob
  queue_as :default
  retry_on StandardError, attempts: 0

  def perform(query, generator_type, card_id=nil)
    return unless Rails.env.production?
    card = Card.find(card_id)

    if generator_type == 'stable_diffusion_core'
      data = Llm::StableDiffusion.new.generate_core(query)
    else
      data = Llm::StableDiffusion.new.generate_sd3(query)
    end

    Tempfile.create(%w[image .webp]) do |file|
      file.binmode
      file.write(data)
      file.rewind

      # image = MiniMagick::Image.read(file)
      # image.combine_options do |c|
      #   c.gravity 'center'
      #   c.crop '800x600+0+0'
      # end
      #
      # # Attach the temporary file to the card photo
      # card.photo.attach(io: StringIO.new(image.to_blob), filename: "#{card.id}.webp", content_type: 'image/webp')

      image = Vips::Image.new_from_file(file.path)
      cropped_image = image.crop((image.width - 800) / 2, (image.height - 600) / 2, 800, 600)

      # Attach the temporary file to the card photo
      card.photo.attach(io: StringIO.new(image.write_to_buffer('.webp')), filename: "#{card.id}.webp", content_type: 'image/webp')
    end
  end
end
