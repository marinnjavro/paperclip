Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'localhost:3000', '127.0.0.1:3000', '[::1]:3000',
            'localhost:8080', '127.0.0.1:8080', '[::1]:8080',
            'localhost:8081', '127.0.0.1:8081', '[::1]:8081',
            'http://localhost:8081', '127.0.0.1:8081', '[::1]:8081',
            'https://cogent-frontend.herokuapp.com',
            'https://cogent.lu',
            'https://www.cogent.lu',
            'cogent.lu',
            'stage.cogent.lu',
            /\Ahttps:\/\/cogent-.*\.vercel\.app\z/,
            /\Ahttp:\/\/192\.168\.\d{1,3}\.\d{1,3}(:\d+)?\z/,
            /\Ahttp:\/\/172\.\d{1,3}\.\d{1,3}\.\d{1,3}(:\d+)?\z/,
            /\Ahttp:\/\/10\.\d{1,3}\.\d{1,3}\.\d{1,3}(:\d+)?\z/
    resource '*',
    headers: :any,
    expose:  %w[access-token expiry token-type uid client Content-Type Authorization],
    methods: [:get, :post, :put, :patch, :delete, :options, :head],
    credentials: true
  end
end