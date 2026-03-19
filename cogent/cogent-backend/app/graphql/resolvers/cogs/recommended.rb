class Resolvers::Cogs::Recommended < Resolvers::BaseSearchResolver
  description 'Returns recommended cogs for the feed'

  type Types::PaginatedType.collection_type(Types::CogType), null: false

  scope {
    Cog.where(is_public: true)
       .where(id: Cog.joins(blocks: :cards).select(:id))
       .order(Arel.sql(
         "(1.0 / (1.0 + EXTRACT(EPOCH FROM (NOW() - cogs.created_at)) / 86400.0)) DESC"
       ))
  }

  option :exclude_mine, type: GraphQL::Types::Boolean, default: true, with: :apply_exclude_mine
  option :pagination, type: GraphQL::Types::JSON, with: :apply_paging

  def apply_exclude_mine(scope, value)
    return scope unless value && current_user
    scope.where.not(user_id: current_user.id)
  end
end
