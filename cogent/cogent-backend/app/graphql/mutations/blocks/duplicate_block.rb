module Mutations
  module Blocks
    class DuplicateBlock < Mutations::BaseMutation
      description 'Duplicates specified Block'

      field :block, Types::BlockType, null: true

      argument :id, ID, required: true
      argument :attributes, Types::Input::BlockInput, required: true


      def resolve(id:, attributes:)
        authorize!(:create, Block)
        original_record = Block.find(id)
        new_record = original_record.amoeba_dup
        new_record.cog_id = attributes.cog_id

        if new_record.save
          { block: new_record }
        else
          model_errors!(new_record)
        end
      end

    end
  end
end
