class Resolvers::Cards::Single < GraphQL::Schema::Resolver
    description 'Returns single card'

    argument :id, ID, required: true 
  
    type Types::CardType, null: false
    
    def resolve(id:)
      Card.find(id)
    end
end