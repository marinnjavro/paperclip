module Types
  class OrganizationType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :photo_url, String, null: true do
      argument :width, Integer, required: false
      argument :height, Integer, required: false
      argument :quality, Float, required: false
    end
    
    def photo_url(width: nil, height: nil, quality: nil)
      return unless object.photo.attached?
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
  end
end
