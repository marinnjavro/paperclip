module Mutations
  module Cards
    class DuplicateCard < Mutations::BaseMutation
      description 'Duplicates specified Card'

      field :card, Types::CardType, null: true

      argument :id, ID, required: true
      argument :attributes, Types::Input::CardInput, required: true


      def resolve(id:, attributes:)
        #CHECK THE PICS
        authorize!(:create, Card)
        original_record = Card.find(id)
        new_record = original_record.amoeba_dup

        new_record.parent_card_id = attributes.parent_card_id
        new_record.card_type = attributes.card_type
        new_record.block_id = attributes.block_id

        if new_record.save
          { card: new_record }
        else
          model_errors!(new_record)
        end
      end

    end
  end
end
