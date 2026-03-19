class Resolvers::Cogs::Single < GraphQL::Schema::Resolver
  description 'Returns single cog'

  argument :id, ID, required: true

  type Types::CogType, null: false

  def resolve(id:)
    Cog.find(id)
  end
end