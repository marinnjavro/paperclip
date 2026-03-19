class Resolvers::Cards::All < Resolvers::BaseResolver
  description 'Returns a list of cards'

  type [Types::CardType], null: false
  
  def resolve
    current_user.organization.cards.sort_by { |k| k.values_at("block_id", "position") }
  end
end