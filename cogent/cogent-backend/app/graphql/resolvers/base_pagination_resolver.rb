module Resolvers
  class BasePaginationResolver < GraphQL::Schema::Resolver
    include Paginatable

    def current_user
      context[:current_resource]
    end
  end
end
