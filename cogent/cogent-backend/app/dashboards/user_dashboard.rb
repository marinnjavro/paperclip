require "administrate/base_dashboard"

class UserDashboard < Administrate::BaseDashboard
  # ATTRIBUTE_TYPES
  # a hash that describes the type of each of the model's fields.
  #
  # Each different type represents an Administrate::Field object,
  # which determines how the attribute is displayed
  # on pages throughout the dashboard.
  ATTRIBUTE_TYPES = {
    roles: Field::HasMany,
    id: Field::String,
    provider: Field::String,
    uid: Field::String,
    name: Field::String,
    email: Field::String,
    password: Field::String,
    encrypted_password: Field::String,
    organization: Field::BelongsTo,
    reset_password_token: Field::String,
    reset_password_sent_at: Field::DateTime,
    remember_created_at: Field::DateTime,
    sign_in_count: Field::Number,
    current_sign_in_at: Field::DateTime,
    last_sign_in_at: Field::DateTime,
    current_sign_in_ip: Field::String,
    last_sign_in_ip: Field::String,
    confirmation_token: Field::String,
    confirmed_at: Field::DateTime,
    confirmation_sent_at: Field::DateTime,
    unconfirmed_email: Field::String,
    failed_attempts: Field::Number,
    unlock_token: Field::String,
    locked_at: Field::DateTime,
    nickname: Field::String,
    photo: Field::ActiveStorage.with_options(
      direct_upload: true,
      destroy_url: proc do |namespace, resource, attachment|
        [:attachment_admin_user, { attachment_type: :photo }]
      end
    ),
    tokens: Field::String.with_options(searchable: false),
    created_at: Field::DateTime,
    updated_at: Field::DateTime,
  }.freeze

  # COLLECTION_ATTRIBUTES
  # an array of attributes that will be displayed on the model's index page.
  #
  # By default, it's limited to four items to reduce clutter on index pages.
  # Feel free to add, remove, or rearrange items.
  COLLECTION_ATTRIBUTES = %i[
    roles
    id
    provider
    uid
  ].freeze

  # SHOW_PAGE_ATTRIBUTES
  # an array of attributes that will be displayed on the model's show page.
  SHOW_PAGE_ATTRIBUTES = %i[
    roles
    id
    provider
    uid
    name
    email
    sign_in_count
    current_sign_in_at
    last_sign_in_at
    current_sign_in_ip
    last_sign_in_ip
    confirmed_at
    failed_attempts
    locked_at
    nickname
    created_at
    updated_at
  ].freeze

  # FORM_ATTRIBUTES
  # an array of attributes that will be displayed
  # on the model's form (`new` and `edit`) pages.
  FORM_ATTRIBUTES = %i[
    roles
    organization
    name
    email
    password
    confirmed_at
    photo
  ].freeze

  # COLLECTION_FILTERS
  # a hash that defines filters that can be used while searching via the search
  # field of the dashboard.
  #
  # For example to add an option to search for open resources by typing "open:"
  # in the search field:
  #
  #   COLLECTION_FILTERS = {
  #     open: ->(resources) { resources.where(open: true) }
  #   }.freeze
  COLLECTION_FILTERS = {}.freeze

  # Overwrite this method to customize how users are displayed
  # across all pages of the admin dashboard.
  #
  def search_attributes
    fields = [:id, :email, :name, :confirmed_at, :unconfirmed_email]
    fields.select do |attribute|
      attribute_types[attribute].searchable?
    end
  end

  def display_resource(user)
    "#{user.email}"
  end
end
