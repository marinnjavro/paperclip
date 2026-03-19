class Card < ApplicationRecord
  include Rails.application.routes.url_helpers
  include ArrayToEnumHash

  ACTION_CARD_JSON_SCHEMA = Rails.root.join('config', 'schemas', 'action_card.json')

  acts_as_list scope: :block

  has_one_attached :photo
  has_one_attached :audio
  has_one_attached :video

  belongs_to :block
  has_one :cog, through: :block

  enum card_type: CardTypes::TYPES.reduce({}) {|acc, x| acc.update(x.to_sym => x.to_s)}, _suffix: true

  # validates :name, presence: true
  validates :actions, allow_blank: true, json: { message: ->(errors) { errors }, schema: ACTION_CARD_JSON_SCHEMA }

  def card_type
    @card_type ||= CardTypes.new(read_attribute(:card_type)).type
  end

  def card_category
    CardTypes.category_for(card_type)
  end

  def photo_url
    media_endpoint + rails_blob_path(self.photo, only_path: true)
  end

  def video_url
    media_endpoint + rails_blob_path(self.video, only_path: true)
  end

  def audio_url
    media_endpoint + rails_blob_path(self.audio, only_path: true)
  end

  amoeba do
    enable
  end

  def self.ransackable_attributes(auth_object = nil)
    %w[name card_type text] # replace with your actual attribute names
  end

  def self.ransackable_associations(auth_object = nil)
    ["audio_attachment", "audio_blob", "block", "cog", "photo_attachment", "photo_blob", "video_attachment", "video_blob"]
  end

  def self.with_attachments
    with_attached_photo.with_attached_audio.with_attached_video
  end

  private

  def media_endpoint
    endpoint = Rails.application.credentials.dig(Rails.env.to_sym, :endpoint)
    unless endpoint
      opts = Rails.application.routes.default_url_options
      endpoint = "http://#{opts[:host]}:#{opts[:port]}"
    end
    endpoint
  end

  def direct_file_url(attachment)
    ActiveStorage::Current.url_options = { host: Rails.application.credentials.dig(Rails.env.to_sym, :endpoint) }
    ActiveStorage::Blob.service.url(attachment.key, disposition: 'inline', content_type: attachment.content_type, filename: attachment.filename, expires_in: 20_000)
  end

end
