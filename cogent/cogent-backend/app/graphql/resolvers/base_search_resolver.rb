module Resolvers
  class BaseSearchResolver < GraphQL::Schema::Resolver
    require 'search_object'
    require 'search_object/plugin/graphql'
    include SearchObject.module(:graphql)

    def current_user
      context[:current_resource]
    end

    option :order, type: String, with: :apply_order

    def apply_order(scope, value)
      ordered_scope = value.present? ? scope.order(value) : scope
      ordered_scope
    end

    def apply_paging(scope, pagination = {})
      pagy = Pagy.new(count: scope.count, page: pagination['page'], items: pagination['limit'])
      {
        collection: scope.offset(pagy.offset).limit(pagy.items),
        metadata: {
          total_pages: pagy.pages,
          total_count: pagy.count,
          current_page: pagy.page,
          limit_value: pagy.items
        }
      }
    end
  end
end