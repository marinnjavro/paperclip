module Mutations
  module Cogs
    class DestroyCog < Mutations::BaseMutation
      description 'Destroys specified Cog'

      argument :id, ID, required: true

      type Types::CogType

      def resolve(id:)
        model = Cog.find(id)
        authorize!(:destroy, model)
        model.destroy
      end
    end
  end
end
