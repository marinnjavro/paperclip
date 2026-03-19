module Paginatable
  include Pagy::Backend
  extend ActiveSupport::Concern

  included do
    argument :page, Integer, required: false
    argument :limit, Integer, required: false
  end

  def pagy_custom(collection, vars = {})
    pagy = Pagy.new(count: collection.count(*vars[:count_args]), page: vars[:page], **vars)
    [pagy, collection.offset(pagy.offset).limit(pagy.items)]
  end

  def resolve(args = {})
    args = args.to_h
    @pagy, @records = pagy_custom(collection, page: args[:page], limit: args[:limit])
    OpenStruct.new(metadata: metadata, collection: @records)
  end

  def metadata
    {
      total_pages: @pagy.pages,
      total_count: @pagy.count,
      current_page: @pagy.page,
      limit_value: @pagy.items
    }
  end

  def collection
    raise NotImplementedError, 'Subclasses must implement #collection'
  end
end