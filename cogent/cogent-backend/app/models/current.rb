# app/models/current.rb
class Current < ActiveSupport::CurrentAttributes
  attribute :user

  resets { Time.zone = nil }
end