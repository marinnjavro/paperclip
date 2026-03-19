class Resolvers::Blocks::Search < Resolvers::BaseSearchResolver
  description 'Search blocks'

  type Types::PaginatedType.collection_type(Types::BlockType), null: false

  option :filters, type: GraphQL::Types::JSON, with: :apply_filters
  option :pagination, type: GraphQL::Types::JSON, with: :apply_paging

  scope { Block.includes(:cards, :cog).where(cog: { user_id: current_user.id }) }

  def apply_filters(scope, filters = {})
    return scope if filters.nil?

    search_params = {}
    search_params[:name_cont] = filters['query'] unless filters['query'].blank?
    search_params[:cards_card_type_in] = filters['card_type'] unless filters['card_type'].blank?
    scope.ransack(search_params).result
  end
end
