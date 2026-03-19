module Mutations
  module Cards
    class CreateCard < Mutations::BaseMutation
      description "Creates new Card"

      field :card, Types::CardType, null: false

      argument :attributes, Types::Input::CardInput, required: true

      def resolve(attributes:)
        authorize!(:create, Card)
        data = attributes.to_h
        block = Block.find(data[:block_id])
        model = block.cards.new(data)

        if model.save
          { card: model }
        else
          model_errors!(model)
        end
      end
    end
  end
end
