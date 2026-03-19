module Recommendations
  class Cogs
    DEFAULT_LIMIT = 12

    # Returns cogs similar to a given cog using vector cosine distance
    def self.similar_to(cog, limit: 6)
      return Cog.none if cog.embedding.nil?

      cog.nearest_neighbors(:embedding, distance: "cosine")
         .where(is_public: true)
         .where.not(embedding: nil)
         .where(id: Cog.joins(blocks: :cards).select(:id))
         .limit(limit)
    end

    # Returns recommended cogs for the feed
    # Phase 1: recency-weighted, excludes user's own cogs
    def self.feed(user: nil)
      scope = Cog.where(is_public: true)
                 .where(id: Cog.joins(blocks: :cards).select(:id))

      scope = scope.where.not(user_id: user.id) if user

      # Recency score: newer cogs rank higher
      # Formula: 1 / (1 + days_old) gives a 0-1 score that decays over time
      scope.order(Arel.sql(
        "(1.0 / (1.0 + EXTRACT(EPOCH FROM (NOW() - cogs.created_at)) / 86400.0)) DESC"
      ))
    end

    # Embed a search query and find semantically similar cogs
    def self.search_by_text(query, limit: DEFAULT_LIMIT)
      provider = Cog.class_variable_get(:@@provider)
      query_embedding = provider.llm.embed(text: query).embedding

      Cog.nearest_neighbors(:embedding, query_embedding, distance: "cosine")
         .where(is_public: true)
         .where(id: Cog.joins(blocks: :cards).select(:id))
         .limit(limit)
    end
  end
end
