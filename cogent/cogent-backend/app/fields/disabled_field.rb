require "administrate/field/base"

class DisabledField < Administrate::Field::Base
  def to_s
    data
  end
end
