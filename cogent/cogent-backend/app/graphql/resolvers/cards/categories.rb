class Resolvers::Cards::Categories < Resolvers::BaseResolver
  description 'Returns all card categories with their associated card types'

  type [Types::CardCategoryType], null: false

  def resolve
    CardTypes::CATEGORIES.map do |name, types|
      { name: name, card_types: types }
    end
  end
end
