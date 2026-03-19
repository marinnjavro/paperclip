module Types
    module Input
        class UserInput < Types::BaseInputObject
            description "Attributes for updating current user"
            
            argument :name, String, required: true
            argument :bio, String, required: false
            argument :photo, ApolloUploadServer::Upload, required: false, prepare: -> (upload, _) {
                upload&.__getobj__ # Unwrap value for ActiveStorage
            }
        end
    end
end