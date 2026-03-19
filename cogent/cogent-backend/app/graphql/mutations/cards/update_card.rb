module Mutations
  module Cards
    class UpdateCard < Mutations::BaseMutation
      description 'Updates specified Card'

      field :card, Types::CardType, null: false

      argument :id, ID, required: true
      argument :attributes, Types::Input::CardInput, required: true

      def resolve(id:, attributes:)
        model = Card.find(id)
        authorize!(:update, model)

        if model.update(attributes.to_h)
          { card: model }
        else
          model_errors!(model)
        end
      end
    end
  end
end
