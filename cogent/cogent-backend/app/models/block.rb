class Block < ApplicationRecord
  has_many :cards, dependent: :destroy
  belongs_to :cog
  acts_as_list scope: :cog
  has_one :organization, through: :cog

  validates :name, presence: true

  amoeba do
    enable
    include_association :cards
    prepend :name => "Copy of "
  end
  def self.ransackable_associations(auth_object = nil)
    ["cards", "cog", "organization"]
  end

  def self.ransackable_attributes(auth_object = nil)
    ["cog_id", "created_at", "id", "name", "position", "updated_at"]
  end
end
