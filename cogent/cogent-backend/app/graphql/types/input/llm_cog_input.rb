module Types
  module Input
    class LlmCogInput < Types::BaseInputObject
      description "Attributes for creating or updating cog"

      argument :query, String, required: false
      argument :url, String, required: false
      argument :guidance, String, required: false
      argument :length_setting, String, required: false
      argument :style_setting, String, required: false
      argument :teach_setting, String, required: false
      argument :depth_setting, String, required: false
      argument :number_of_blocks, Integer, required: false
      argument :number_of_cards, Integer, required: false
    end
  end
end