module Mutations
  module Cards
    class LlmGenerateCard < Mutations::BaseMutation
      description 'Generates new Card with LLM'

      field :card, Types::CardType, null: true

      argument :attributes, Types::Input::LlmCardInput, required: true

      def resolve(attributes:)
        attr = attributes.to_h
        card = Card.find(attr[:card_id])
        authorize!(:create, card)
        card = Llm::Cards.new(
          card.id,
          card.name,
        ).generate
        { card: card }
      end
    end
  end
end
