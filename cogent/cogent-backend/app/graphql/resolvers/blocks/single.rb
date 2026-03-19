class Resolvers::Blocks::Single < GraphQL::Schema::Resolver
    description 'Returns single block'

    argument :id, ID, required: true 
  
    type Types::BlockType, null: false
    
    def resolve(id:)
      Block.find(id)
    end
end