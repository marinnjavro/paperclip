module Mutations
  module Blocks
    class ChangePositionBlock < Mutations::BaseMutation
      description 'Changes order position of specified Block'

      field :block, Types::BlockType, null: false

      argument :attributes, Types::Input::BlockChangePositionInput, required: true

      def resolve(attributes:)
        authorize!(:update, Block)
        data = attributes.to_h
        model = Block.find(data[:id])
        data[:position] += 1 if data[:position] == plugin_top_position
        model.insert_at(data[:position])
        { block: model }
      end

      def plugin_top_position
        0
      end
    end
  end
end
