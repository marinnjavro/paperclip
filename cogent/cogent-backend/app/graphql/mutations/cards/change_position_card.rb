module Mutations
  module Cards
    class ChangePositionCard < Mutations::BaseMutation
      description 'Changes order position of specified Card'

      field :card, Types::CardType, null: false

      argument :attributes, Types::Input::CardChangePositionInput, required: true

      def resolve(attributes:)
        authorize!(:update, Card)
        data = attributes.to_h
        model = Card.find(data[:id])
        data[:position] += 1 if data[:position] == plugin_top_position
        model.insert_at(data[:position])
        { card: model }
      end

      def plugin_top_position
        0
      end
    end
  end
end
