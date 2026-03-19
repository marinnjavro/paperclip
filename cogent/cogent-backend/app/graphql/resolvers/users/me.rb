class Resolvers::Users::Me < Resolvers::BaseResolver
  description 'Returns single user'

  type Types::UserType, null: false

  def resolve
    current_user
  end
end
