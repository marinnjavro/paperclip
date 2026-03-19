# syntax = docker/dockerfile:1.4

# Production Dockerfile for Cogent Backend
ARG RUBY_VERSION=3.2.2

# ============================================
# Build stage — install gems, precompile assets
# ============================================
FROM docker.io/library/ruby:$RUBY_VERSION-slim AS build

RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y \
    build-essential git libpq-dev pkg-config curl nodejs npm libvips && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

WORKDIR /app

# Install gems (without dev/test groups)
COPY Gemfile Gemfile.lock ./
RUN bundle config set --local without 'development test' && \
    bundle install && \
    rm -rf ~/.bundle/ "${BUNDLE_PATH}"/ruby/*/cache "${BUNDLE_PATH}"/ruby/*/bundler/gems/*/.git

# Copy application code
COPY . .

# Precompile assets (admin panel uses Tailwind + Sprockets)
RUN SECRET_KEY_BASE_DUMMY=1 bundle exec rails assets:precompile

# ============================================
# Runtime stage — lean production image
# ============================================
FROM docker.io/library/ruby:$RUBY_VERSION-slim

RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y \
    curl libjemalloc2 libvips postgresql-client && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Use jemalloc for better memory management
ENV LD_PRELOAD=libjemalloc.so.2

ENV RAILS_ENV=production \
    RAILS_LOG_TO_STDOUT=true \
    RAILS_SERVE_STATIC_FILES=true \
    BUNDLE_PATH="/usr/local/bundle"

WORKDIR /app

# Copy built gems and application from build stage
COPY --from=build /usr/local/bundle /usr/local/bundle
COPY --from=build /app /app

EXPOSE 8080

CMD ["bundle", "exec", "puma", "-C", "config/puma.rb"]
