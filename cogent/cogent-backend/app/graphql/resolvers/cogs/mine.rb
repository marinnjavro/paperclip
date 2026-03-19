class Resolvers::Cogs::Mine < Resolvers::BaseSearchResolver
  description 'Search my cards'

  # ALL OF THE COGS ARE OWNED BY ME - BUT NOT CREATED - TRACE THE ORIGINAL CREATOR OF THE COG
  # DUPLICATED COGS SHOULD SHOW ONLY THE INITIAL CREATOR -> EVEN IF THEY ARE DUPLICATED FROM SOMEONE ELSE

  type Types::PaginatedType.collection_type(Types::CogType), null: false

  scope { Cog.includes(:cards, :blocks) }

  option :user, type: Resolvers::Cogs::Search::UserEnum, default: 'ME'
  option :filters, type: GraphQL::Types::JSON, with: :apply_filters
  option :pagination, type: GraphQL::Types::JSON, with: :apply_paging

  def apply_user_with_me(scope)
    scope.where(cogs: { user_id: current_user&.id })
  end

  def apply_user_with_all_without_me(scope)
    scope.where.not(cogs: { user_id: current_user&.id })
  end

  def apply_user_with_all(scope)
    scope
  end

  def apply_filters(scope, filters = {})
    return scope if filters.nil?

    if filters['query'].present?
      name_matches = scope.ransack(name_cont: filters['query']).result
      description_matches = scope.ransack(description_cont: filters['query']).result
      tags_matches = scope.with_tag_like(filters['query'])

      scope = name_matches.or(description_matches).or(tags_matches)
    end

    if filters['card_type'].present?
      card_type_matches = scope.ransack(cards_card_type_in: filters['card_type']).result
      scope = scope.or(card_type_matches)
    end

    scope
  end
end
