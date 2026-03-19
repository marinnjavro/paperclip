class Resolvers::Cogs::Similar < Resolvers::BaseResolver
  description 'Returns cogs similar to a given cog based on content similarity'

  argument :cog_id, ID, required: true
  argument :limit, Integer, required: false, default_value: 6

  type [Types::CogType], null: false

  def resolve(cog_id:, limit:)
    cog = Cog.find(cog_id)
    Recommendations::Cogs.similar_to(cog, limit: limit)
  end
end
