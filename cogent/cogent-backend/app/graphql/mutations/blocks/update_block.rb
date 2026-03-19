module Mutations
  module Blocks
    class UpdateBlock < Mutations::BaseMutation
      description 'Updates specified Block'

      field :block, Types::BlockType, null: false

      argument :id, ID, required: true
      argument :attributes, Types::Input::BlockInput, required: true

      def resolve(id:, attributes:)
        model = Block.find(id)
        authorize!(:update, model)

        if model.update(attributes.to_h)
          { block: model }
        else
          model_errors!(model)
        end
      end
    end
  end
end
