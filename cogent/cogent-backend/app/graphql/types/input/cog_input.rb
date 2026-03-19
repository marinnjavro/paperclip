module Types
    module Input
        class CogInput < Types::BaseInputObject
            description "Attributes for creating or updating cog"
            
            argument :name, String, required: false
            argument :description, String, required: false
            argument :tags, [String], required: false
            argument :is_pinned, Boolean, required: false
            argument :is_public, Boolean, required: false
            argument :photo, ApolloUploadServer::Upload, required: false, prepare: -> (upload, _) {
                upload&.__getobj__ # Unwrap value for ActiveStorage
            }
        end
    end
end