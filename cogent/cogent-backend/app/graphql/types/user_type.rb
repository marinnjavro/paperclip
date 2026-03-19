module Types
  class UserType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: true
    field :bio, String, null: true
    field :email, String, null: true
    field :roles, String, null: true
    field :organization, Types::OrganizationType, null: true
    field :sign_in_count, String, null: true
    field :cogs, [Types::CogType], null: true do
      argument :id, ID, required: false
    end
    field :blocks, [Types::BlockType], null: true do
      argument :id, ID, required: false
    end
    field :photo_url, String, null: true do
      argument :width, Integer, required: false
      argument :height, Integer, required: false
      argument :quality, Float, required: false
    end

    def cogs(id: nil)
      if id
        Array.wrap(object.cogs.find(id))
      else
        object.cogs
      end
    end

    def blocks(id: nil)
      if id
        Array.wrap(object.blocks.find(id))
      else
        object.blocks.sort_by { |k| k.values_at("cog_id", "position") }
      end
    end

    def roles
      object.roles&.map(&:name)&.join(', ')
    end

    def photo_url(width: nil, height: nil, quality: nil)
      return unless object.photo.attached?
      return object.photo_url if Rails.env.development?
      if object.photo && quality && width && height
        Imgproxy.url_for(
          "#{object.photo_url}",
          quality: quality,
          width: width,
          height: height,
          resizing_type: :fit,
          base64_encode_url: true
        )
      elsif object.photo && quality
        Imgproxy.url_for(
          "#{object.photo_url}",
          quality: quality,
          resizing_type: :fit,
          base64_encode_url: true
        )
      elsif object.photo && width && height
        Imgproxy.url_for(
          "#{object.photo_url}",
          width: width,
          height: height,
          resizing_type: :fit,
          base64_encode_url: true
        )
      elsif object.photo
        object.photo_url
      end
    end

    #field :organization, [Types::Organization], null: false
  end
end