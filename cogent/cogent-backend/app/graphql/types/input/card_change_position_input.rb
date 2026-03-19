module Types
  module Input
    class CardChangePositionInput < Types::BaseInputObject
      description "Attributes for changing card position"

      argument :id, ID, required: true
      argument :position, Integer, required: true
    end
  end
end