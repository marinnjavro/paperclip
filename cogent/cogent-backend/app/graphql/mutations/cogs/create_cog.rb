module Mutations
  module Cogs
    class CreateCog < Mutations::BaseMutation
      description 'Creates new Cog'

      field :cog, Types::CogType, null: true

      argument :attributes, Types::Input::CogInput, required: true

      def resolve(attributes:)
        authorize!(:create, Cog)
        model = current_user.cogs.new(attributes.to_h)

        if model.save
          { cog: model }
        else
          model_errors!(model)
        end
      end
    end
  end
end
