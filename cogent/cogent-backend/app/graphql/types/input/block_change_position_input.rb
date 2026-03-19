module Types
  module Input
    class BlockChangePositionInput < Types::BaseInputObject
      description "Attributes for changing block position"

      argument :id, ID, required: true
      argument :position, Integer, required: true
    end
  end
end