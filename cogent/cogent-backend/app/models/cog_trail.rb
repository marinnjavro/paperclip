# frozen_string_literal: true

class CogTrail < ApplicationRecord
  belongs_to :original_cog, class_name: 'Cog'
  belongs_to :last_cog, class_name: 'Cog'
  belongs_to :new_cog, class_name: 'Cog'
end
