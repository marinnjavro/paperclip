module Mutations
  module Blocks
    class DestroyBlock < Mutations::BaseMutation
      description 'Destroys specified Block'

      argument :id, ID, required: true

      type Types::BlockType

      def resolve(id:)
        model = Block.find(id)
        authorize!(:destroy, model)
        model.destroy
      end
    end
  end
end
