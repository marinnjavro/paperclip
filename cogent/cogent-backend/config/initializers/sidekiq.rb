require 'sidekiq'
require 'sidekiq-status'

SIDEKIQ_REDIS = {
  url: ENV.fetch("REDIS_URL"),
  ssl_params: { verify_mode: OpenSSL::SSL::VERIFY_NONE }
}.freeze

Sidekiq.configure_server do |config|
  config.redis = SIDEKIQ_REDIS
end

Sidekiq.configure_client do |config|
  config.redis = SIDEKIQ_REDIS
end

# Explicitly configure Redis client
# Redis.new(SIDEKIQ_REDIS)