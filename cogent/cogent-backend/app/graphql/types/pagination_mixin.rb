# frozen_string_literal: true

module Types
  module PaginationMixin
    include Pagy::Backend

    def paginate_collection(collection, page: nil, limit: nil)
      @pagy, @records = pagy_custom(collection, page: page, limit: limit)
      OpenStruct.new(metadata: pagination_metadata, collection: @records)
    end

    private

    def pagy_custom(collection, vars = {})
      pagy = Pagy.new(count: collection.count(*vars[:count_args]), page: vars[:page], items: vars[:limit], **vars)
      [pagy, collection.offset(pagy.offset).limit(pagy.items)]
    end

    def pagination_metadata
      {
        total_pages: @pagy.pages,
        total_count: @pagy.count,
        current_page: @pagy.page,
        limit_value: @pagy.items
      }
    end
  end
end
