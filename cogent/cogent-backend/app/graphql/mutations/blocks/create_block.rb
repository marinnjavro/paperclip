module Mutations
  module Blocks
    class CreateBlock < Mutations::BaseMutation
      description "Creates new Block"

      field :block, Types::BlockType, null: false

      argument :attributes, Types::Input::BlockInput, required: true

      def resolve(attributes:)
        authorize!(:create, Block)
        data = attributes.to_h
        cog = Cog.find(data[:cog_id])
        model = cog.blocks.new(data)

        if model.save
          { block: model }
        else
          model_errors!(model)
        end
      end
    end
  end
end
