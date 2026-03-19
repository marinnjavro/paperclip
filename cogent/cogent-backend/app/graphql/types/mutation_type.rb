module Types
  class MutationType < Types::BaseObject
    field :create_cog, mutation: Mutations::Cogs::CreateCog
    field :update_cog, mutation: Mutations::Cogs::UpdateCog
    field :destroy_cog, mutation: Mutations::Cogs::DestroyCog
    field :duplicate_cog, mutation: Mutations::Cogs::DuplicateCog
    field :vertical_cog, mutation: Mutations::Cogs::VerticalCog
    field :llm_generate_cog, mutation: Mutations::Cogs::LlmGenerateCog
    field :llm_generate_card, mutation: Mutations::Cards::LlmGenerateCard
    field :llm_generate_image, mutation: Mutations::Cards::LlmGenerateImage

    field :create_block, mutation: Mutations::Blocks::CreateBlock
    field :update_block, mutation: Mutations::Blocks::UpdateBlock
    field :destroy_block, mutation: Mutations::Blocks::DestroyBlock
    field :change_position_block, mutation: Mutations::Blocks::ChangePositionBlock
    field :duplicate_block, mutation: Mutations::Blocks::DuplicateBlock

    field :create_card, mutation: Mutations::Cards::CreateCard
    field :update_card, mutation: Mutations::Cards::UpdateCard
    field :destroy_card, mutation: Mutations::Cards::DestroyCard
    field :change_position_card, mutation: Mutations::Cards::ChangePositionCard
    field :duplicate_card, mutation: Mutations::Cards::DuplicateCard

    field :update_user, mutation: Mutations::Users::UpdateUser

    # field :test_field, String, null: false, 
    #   description: "An example field added by the generator"
    # def test_field
    #   "Hello World"
    # end
  end
end
