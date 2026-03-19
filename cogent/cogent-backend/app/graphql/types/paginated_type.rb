module Types
  class PaginatedType < Types::BaseObject
    def self.collection_type(type)
      captured_type = type
      class_name = "#{captured_type.name.gsub('Types::', '')}PaginatedType"

      # Check if the class already exists within the Types module
      if Types.const_defined?(class_name)
        # If the class exists, return it
        Types.const_get(class_name)
      else
        # If the class doesn't exist, create it
        klass = Class.new(Types::BaseObject) do
          field :collection, [captured_type], null: false
          field :metadata, Types::MetadataType, null: false

          define_singleton_method(:name) do
            class_name
          end
        end
        # Set the constant within the Types module to the newly created class
        Types.const_set(class_name, klass)
      end
    end
  end
end