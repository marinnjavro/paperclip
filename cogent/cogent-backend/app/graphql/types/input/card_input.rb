module Types
    module Input
        class CardInput < Types::BaseInputObject
            description "Attributes for creating or updating card"

            argument :name, String, required: false
            argument :card_type, String, required: true
            argument :block_id, ID, required: true
            argument :parent_card_id, ID, required: false
            argument :text, String, required: false
            argument :actions, GraphQL::Types::JSON, required: false
            argument :photo, ApolloUploadServer::Upload, required: false, prepare: -> (upload, _) {
                upload&.__getobj__ # Unwrap value for ActiveStorage
            }
            argument :audio, ApolloUploadServer::Upload, required: false, prepare: -> (upload, _) {
                upload&.__getobj__ # Unwrap value for ActiveStorage
            }
            argument :video, ApolloUploadServer::Upload, required: false, prepare: -> (upload, _) {
                upload&.__getobj__ # Unwrap value for ActiveStorage
            }
        end
    end
end