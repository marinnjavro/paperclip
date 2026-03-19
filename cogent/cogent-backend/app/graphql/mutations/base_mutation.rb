module Mutations
  class BaseMutation < GraphQL::Schema::RelayClassicMutation
    argument_class Types::BaseArgument
    field_class Types::BaseField
    input_object_class Types::BaseInputObject
    object_class Types::BaseObject

    def current_user
      context[:current_resource]
    end

    def current_ability
      @current_ability ||= ::Ability.new(current_user)
    end

    def authorize!(*args)
      current_ability.authorize!(*args)
    rescue CanCan::AccessDenied => e
      raise GraphQL::ExecutionError.new(e.message)
    end

    def model_errors!(model)
      { errors: model.errors.full_messages.map { |err| { message: err } } }
    end

    def raise_error!(message)
      raise GraphQL::ExecutionError.new(message)
    end
  end
end
