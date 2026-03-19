class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token
  before_action :set_active_storage_url_options

  private

  def set_active_storage_url_options
    url_options = { host: request.host, port: request.port, protocol: request.protocol }
    Rails.application.routes.default_url_options = url_options
    ActiveStorage::Current.url_options = url_options
  end
end
