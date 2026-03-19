module Mutations
  module Cards
    class DestroyCard < Mutations::BaseMutation
      description 'Destroys specified Card'

      argument :id, ID, required: true

      type Types::CardType

      def resolve(id:)
        model = Card.find(id)
        authorize!(:destroy, model)
        model.destroy
      end
    end
  end
end
