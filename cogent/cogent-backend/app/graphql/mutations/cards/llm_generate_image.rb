module Mutations
  module Cards
    class LlmGenerateImage < Mutations::BaseMutation
      description 'Generates new Card with LLM'

      field :card, Types::CardType, null: true

      argument :attributes, Types::Input::LlmCardInput, required: true

      def resolve(attributes:)
        attr = attributes.to_h
        card = Card.find(attr[:card_id])
        authorize!(:create, card)
        if attr[:generator_type] == 'dalle3'
          GenerateDalleImageJob.new.perform(attr[:query], card.id)
        else
          GenerateStableDiffusionImageJob.new.perform(attr[:query], attr[:generator_type], card.id)
        end

        { card: card }
      end
    end
  end
end
