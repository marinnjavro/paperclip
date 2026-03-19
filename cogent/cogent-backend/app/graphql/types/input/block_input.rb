module Types
    module Input
        class BlockInput < Types::BaseInputObject
            description "Attributes for creating or updating block"

            argument :name, String, required: true
            argument :cog_id, ID, required: true
        end
    end
end