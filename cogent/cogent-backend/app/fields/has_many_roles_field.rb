require "administrate/field/base"

class HasManyRolesField < Administrate::Field::HasMany

  def candidate_resources
    associated_class.where(company_id: Current.user.company).or(
      associated_class.where(id: [1,2,3,4])
    )

  end

  # tell this field to use the views of the `Field::HasMany` parent class
  def to_partial_path
    "/fields/has_many/#{page}"
  end

  # apply the same class as the parent otherwise `selectize` (from JavaScript) doesn't apply
  def html_class
    "has-many"
  end
end
