class Resolvers::Cogs::All < Resolvers::BaseSearchResolver
  description 'Returns a list of cogs'

  type [Types::CogType], null: true

  def resolve
    Cog.where(is_public: false)
  end
end