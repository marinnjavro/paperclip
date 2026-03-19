require "administrate/field/base"

class BelongsToUserField < Administrate::Field::BelongsTo

  def candidate_resources
    Current.user.is_admin? ? Current.user.company.users : [Current.user]
  end

  # tell this field to use the views of the `Field::HasMany` parent class
  def to_partial_path
    "/fields/belongs_to/#{page}"
  end

  # apply the same class as the parent otherwise `selectize` (from JavaScript) doesn't apply
  def html_class
    "belongs-to"
  end
end
