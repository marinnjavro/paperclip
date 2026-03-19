module Mutations
  module Cogs
    class UpdateCog < Mutations::BaseMutation
      description 'Updates specified Cog'

      field :cog, Types::CogType, null: false

      argument :id, ID, required: true
      argument :attributes, Types::Input::CogInput, required: true

      def resolve(id:, attributes:)
        model = Cog.find(id)
        authorize!(:update, model)

        if model.update(attributes.to_h)
          { cog: model }
        else
          model_errors!(model)
        end
      end
    end
  end
end
