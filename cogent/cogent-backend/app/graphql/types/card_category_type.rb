module Types
  class CardCategoryType < Types::BaseObject
    field :name, String, null: false
    field :card_types, [String], null: false
  end
end
