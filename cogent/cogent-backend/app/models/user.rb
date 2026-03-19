class User < ApplicationRecord
  include Rails.application.routes.url_helpers
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :confirmable
  include GraphqlDevise::Authenticatable

  validate :password_complexity
  
  def password_complexity
    # Regexp extracted from https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
    return if password.blank? || password =~ /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,70}$/

    errors.add :password, 'Password complexity requirement not met. Length should be 8-70 characters and include: 1 uppercase, 1 lowercase, 1 digit and 1 special character'
  end

  has_one_attached :photo
  belongs_to :organization, optional: true

  has_many :cogs
  has_many :blocks, through: :cogs
  #has_one :organization, through: :role
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  rolify

  def photo_url
    return nil unless photo.attached?

    url = endpoint
    return rails_blob_path(photo, only_path: true) if url.nil?

    url + rails_blob_path(photo, only_path: true)
  end

  def endpoint
    Rails.application.credentials.dig(Rails.env.to_sym, :endpoint) || "http://localhost:3000"
  end
end
