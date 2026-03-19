module Types
  class CogType < Types::BaseObject
    include PaginationMixin

    field :id, ID, null: false
    field :name, String, null: false
    field :description, String, null: true
    field :tags, [String], null: true
    field :is_pinned, Boolean, null: true
    field :is_public, Boolean, null: true
    field :user, Types::UserType, null: true
    field :created_at, GraphQL::Types::ISO8601DateTime, null: true
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: true
    field :first_card, Types::CardType, null: true
    field :first_block, Types::BlockType, null: true
    field :qr_code, String, null: true
    field :cards, [Types::CardType], null: true
    field :blocks, Types::BlockType.collection_type, null: true do
      argument :page, Integer, required: false
      argument :limit, Integer, required: false
    end
    field :photo_url, String, null: true do
      argument :width, Integer, required: false
      argument :height, Integer, required: false
      argument :quality, Float, required: false
    end
    field :similarity_score, Float, null: true

    def first_card
      object&.cards&.order('position ASC')&.first
    end

    def first_block
      object&.cards&.order('position ASC')&.first&.block
    end

    def blocks(page: nil, limit: nil)
      collection = object.blocks.order('cog_id ASC, position ASC')
      paginate_collection(collection, page: page, limit: limit)
    end

    def cards
      scope = object.cards.sort_by { |k| k.values_at("block_id", "position") }
    end

    def qr_code
      object.genrate_qr_code
    end

    def similarity_score
      return nil unless object.respond_to?(:neighbor_distance)
      distance = object.neighbor_distance
      distance ? (1.0 - distance).round(4) : nil
    end

    def photo_url(width: nil, height: nil, quality: nil)
      return unless object.photo.attached?
      return object.photo_url if Rails.env.development?
      if object.photo && quality && width && height
        Imgproxy.url_for(
          "#{object.photo_url}",
          quality: quality,
          width: width,
          height: height,
          resizing_type: :fit,
          base64_encode_url: true
        )
      elsif object.photo && quality
        Imgproxy.url_for(
          "#{object.photo_url}",
          quality: quality,
          resizing_type: :fit,
          base64_encode_url: true
        )
      elsif object.photo && width && height
        Imgproxy.url_for(
          "#{object.photo_url}",
          width: width,
          height: height,
          resizing_type: :fit,
          base64_encode_url: true
        )
      elsif object.photo
        object.photo_url
      end
    end
  end
end