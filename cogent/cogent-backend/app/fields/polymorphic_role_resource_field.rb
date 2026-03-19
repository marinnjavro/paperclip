require "administrate/field/base"

class PolymorphicRoleResourceField < Administrate::Field::Polymorphic

  def associated_resource_grouped_options
    classes.map do |klass|
      [klass.to_s, candidate_resources_for(klass).map do |resource|
        [display_candidate_resource(resource), resource.to_global_id]
      end]
    end
  end

  def to_partial_path
    "/fields/polymorphic/#{page}"
  end

  # def candidate_resources_for(klass)
  #   order ? klass.order(order) : nil
  #   # order ? klass.order(order) : klass.where(company_id: Current.user.organization)
  #   #                                   .or(klass.where(company_id: Current.user.company.client_companies))
  # end

  def html_class
    "belongs-to"
  end
end