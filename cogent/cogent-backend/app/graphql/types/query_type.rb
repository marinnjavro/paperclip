module Types
  class QueryType < Types::BaseObject
    # Add `node(id: ID!) and `nodes(ids: [ID!]!)`
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :cogs_search, resolver: Resolvers::Cogs::Search
    field :cogs_mine, resolver: Resolvers::Cogs::Mine
    field :blocks_search, resolver: Resolvers::Blocks::Search
    field :cards_search, resolver: Resolvers::Cards::Search

    field :cogs, resolver: Resolvers::Cogs::All
    field :blocks, resolver: Resolvers::Blocks::All
    field :cards, resolver: Resolvers::Cards::All

    field :cog, resolver: Resolvers::Cogs::Single
    field :block, resolver: Resolvers::Blocks::Single
    field :card, resolver: Resolvers::Cards::Single
    field :card_categories, resolver: Resolvers::Cards::Categories

    field :similar_cogs, resolver: Resolvers::Cogs::Similar
    field :recommended_cogs, resolver: Resolvers::Cogs::Recommended

    field :me, resolver: Resolvers::Users::Me
    field :user, resolver: Resolvers::Users::Single

    # field :test_field, String, null: false,
    #   description: "An example field added by the generator"
    # def test_field
    #   "Hello World!"
    # end
  end
end
