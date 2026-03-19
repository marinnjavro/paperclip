class Resolvers::Cards::Search < Resolvers::BaseSearchResolver
  description 'Search cards'

  type Types::PaginatedType.collection_type(Types::CardType), null: false

  option :filters, type: GraphQL::Types::JSON, with: :apply_filters
  option :pagination, type: GraphQL::Types::JSON, with: :apply_paging

  scope { Card.includes(:cog).where(cog: { user_id: current_user.id }) }

  def apply_filters(scope, filters = {})
    return scope if filters.nil?

    search_params = {}
    search_params[:name_or_text_cont] = filters['query'] unless filters['query'].blank?

    if filters['card_category'].present?
      category_types = CardTypes.types_for_category(filters['card_category'])
      existing_types = Array(filters['card_type']).reject(&:blank?)
      combined_types = (existing_types + category_types).uniq
      search_params[:card_type_in] = combined_types
    elsif filters['card_type'].present?
      search_params[:card_type_in] = filters['card_type']
    end

    scope.ransack(search_params).result
  end
end
