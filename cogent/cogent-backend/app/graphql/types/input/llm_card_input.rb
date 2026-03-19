module Types
  module Input
    class LlmCardInput < Types::BaseInputObject
      description "Attributes for creating or updating card"

      argument :card_id, String, required: true
      argument :generator_type, String, required: false
      argument :query, String, required: true
    end
  end
end