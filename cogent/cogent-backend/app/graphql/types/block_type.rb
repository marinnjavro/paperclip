module Types
  class BlockType < Types::BaseObject
    include PaginationMixin

    field :id, ID, null: false
    field :name, String, null: false
    field :cog_id, ID, null: false
    field :position, Integer
    field :created_at, GraphQL::Types::ISO8601DateTime, null: true
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: true

    field :cog, Types::CogType, null: true
    field :cards, Types::CardType.collection_type, null: true do
      argument :page, Integer, required: false
      argument :limit, Integer, required: false
    end

    def cards(page: nil, limit: nil)
      collection = object.cards.order('block_id ASC, position ASC')
      paginate_collection(collection, page: page, limit: limit)
    end

    def self.collection_type
      Types::PaginatedType.collection_type(self)
    end
  end

  # field :metadata, Types::MetadataType, null: true
  # def metadata
  #   context[:pagination_metadata]
  # end
end