module Types
  class MetadataType < Types::BaseObject
    field :total_pages, Integer, null: false
    field :total_count, Integer, null: false
    field :current_page, Integer, null: false
    field :limit_value, Integer, null: false
  end
end