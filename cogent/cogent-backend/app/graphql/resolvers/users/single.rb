class Resolvers::Users::Single < GraphQL::Schema::Resolver
  description 'Returns single user'

  argument :id, ID, required: true

  type Types::UserType, null: false

  def resolve(id:)
    User.find(id)
  end
end