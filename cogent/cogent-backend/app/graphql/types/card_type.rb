# prettier-ignore
module Types
  class CardType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: true
    field :block_id, ID, null: false
    field :block, Types::BlockType, null: true
    field :card_type, String, null: false
    field :card_category, String, null: true
    field :text, String, null: true
    field :position, Integer, null: true
    field :parent_card_id, ID, null: true
    field :actions, GraphQL::Types::JSON, null: true
    field :audio_url, String, null: true
    field :video_url, String, null: true
    field :raw_photo_url, String, null: true
    field :photo_url, String, null: true do
      argument :width, Integer, required: false
      argument :height, Integer, required: false
      argument :quality, Float, required: false
    end
    field :created_at, GraphQL::Types::ISO8601DateTime, null: true
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: true

    def card_type
      object.card_type
    end

    def card_category
      object.card_category
    end

    def raw_photo_url
      object&.photo_url
    end

    def photo_url(width: nil, height: nil, quality: nil)
      return unless object.photo.attached?
      return object.photo.blob.url if object.photo.content_type == 'image/gif' || Rails.env.development?

      options = { resizing_type: :fit, base64_encode_url: true }
      options[:quality] = quality if quality
      options[:width] = width if width
      options[:height] = height if height

      object.photo && options.any? ? Imgproxy.url_for(object.photo.blob.url, **options) : object.photo.blob.url
    end

    def video_url
      return unless object.video.attached?
      object.video_url
    end

    def audio_url
      return unless object.audio.attached?
      object.audio_url
    end

    def self.collection_type
      Types::PaginatedType.collection_type(self)
    end
  end
end
