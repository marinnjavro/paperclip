class Organization < ApplicationRecord
  include Rails.application.routes.url_helpers

  resourcify

  has_many :users
  has_many :cogs, through: :users
  has_many :blocks, through: :cogs
  has_many :cards, through: :blocks

  has_one_attached :photo

  def photo_url
    #direct_file_url(photo)
    Rails.application.credentials
         .dig(Rails.env.to_sym, :endpoint) +
      rails_blob_path(self.photo, only_path: true)
  end

  def self.ransackable_associations(auth_object = nil)
    ["photo_attachment", "photo_blob"]
  end

  def self.with_attachments
    with_attached_photo
  end
end
