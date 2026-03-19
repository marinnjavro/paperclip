module Mutations
  module Cogs
    class DuplicateCog < Mutations::BaseMutation
      description 'Duplicates specified Cog'

      field :cog, Types::CogType, null: true

      argument :id, ID, required: true

      def resolve(id:)
        authorize!(:create, Cog)
        original_record = Cog.find(id)
        new_record = original_record.amoeba_dup

        new_record.user_id = current_user.id

        if new_record.save
          { cog: new_record }
        else
          model_errors!(new_record)
        end
      end

    end
  end
end
