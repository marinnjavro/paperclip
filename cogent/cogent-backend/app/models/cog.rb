class Cog < ApplicationRecord
  vectorsearch
  include Rails.application.routes.url_helpers
  has_many :blocks, dependent: :destroy
  has_many :cards, through: :blocks
  belongs_to :user
  has_one :organization, through: :user
  # If it is cloned don't do it
  #after_create :create_dummy_blocks
  after_save :run_upsert_to_vectorsearch

  has_one_attached :photo

  validates :name, presence: true

  scope :with_tag_like, -> (tag) {
    where("EXISTS (
    SELECT 1 FROM unnest(tags) tag
    WHERE tag ILIKE ?
  )", "%#{tag}%")
  }

  amoeba do
    enable
    prepend name: "Copy of "
    set is_public: false
    customize(lambda { |original_cog,new_cog|
      new_cog.embedding = nil
    })
    # after(:create) do |original_cog, new_cog|
    #   CogTrail.findy_by(original_cog_id: self.id).update(last_cog_id: self.id, new_cog_id: new_cog.id)
    #   CogTrail.create(original_cog_id: self.id, last_cog_id: self.id, new_cog_id: new_cog.id)
    # end
  end

  def photo_url
    endpoint = Rails.application.credentials.dig(Rails.env.to_sym, :endpoint)
    unless endpoint
      opts = Rails.application.routes.default_url_options
      endpoint = "http://#{opts[:host]}:#{opts[:port]}"
    end
    endpoint + rails_blob_path(self.photo, only_path: true)
  end

  def self.ransackable_attributes(auth_object = nil)
    ["created_at", "description", "id", "is_pinned", "is_public", "name", "tags", "updated_at", "user_id"]
  end

  def self.ransackable_associations(auth_object = nil)
    ["blocks", "cards", "organization", "photo_attachment", "photo_blob", "user"]
  end

  def remove_html_tags(string)
    string&.gsub(/<[^>]*>/, '')
  end

  def genrate_qr_code
    endpoint = Rails.application.credentials.dig(Rails.env.to_sym, :endpoint)
    endpoint ||= "http://#{Rails.application.routes.default_url_options[:host]}:#{Rails.application.routes.default_url_options[:port]}"
    url = endpoint + "/cogs/#{id}"
    qrcode = RQRCode::QRCode.new(url)

    png = qrcode.as_png(
      bit_depth: 1,
      border_modules: 4,
      color_mode: ChunkyPNG::COLOR_GRAYSCALE,
      color: "black",
      file: nil,
      fill: "white",
      module_px_size: 6,
      resize_exactly_to: false,
      resize_gte_to: false,
      size: 360
    )
    base64_output = Base64.encode64(png.to_s)
    "data:image/png;base64,#{base64_output}"
  end

  def as_vector
    create_json_document.to_json
  end

  private

  def run_upsert_to_vectorsearch
    if blocks.joins(:cards).exists?
      GenerateCogEmbeddingJob.perform_later(id)
    end
  end

  def create_json_document
    {
      cog: {
        name: name,
        description: description,
        tags: tags,
        blocks: blocks.map do |block|
          {
            name: block.name,
            position: block.position,
            cards: block.cards.map do |card|
              {
                name: card.name,
                card_type: card.card_type,
                position: card.position,
              }
            end
          }
        end
      }
    }
  end

  def create_dummy_blocks
    self.blocks.create(name: "Define the learning objective", position: 1)
    self.blocks.create(name: "Set the problem", position: 2)
    self.blocks.create(name: "Resolve the problem", position: 3)
    self.blocks.create(name: "Conclude and assess", position: 4)
  end
end
