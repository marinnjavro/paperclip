module Mutations
  module Users
    class UpdateUser < Mutations::BaseMutation
      description 'Updates current user'

      field :user, Types::UserType, null: false

      argument :attributes, Types::Input::UserInput, required: true

      def resolve(attributes:)
        model = User.find(current_user.id)
        authorize!(:update, model)

        if model.update(attributes.to_h)
          { user: model }
        else
          model_errors!(model)
        end
      end
    end
  end
end
