class Resolvers::Blocks::All < Resolvers::BasePaginationResolver
  description 'Returns a list of blocks'

  type Types::PaginatedType.collection_type(Types::BlockType), null: false

  def collection
    current_user.organization.blocks.order('cog_id ASC, position ASC')
  end
end
