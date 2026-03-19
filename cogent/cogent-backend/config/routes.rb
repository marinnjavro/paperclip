require 'sidekiq/web'
require 'sidekiq-status/web'
Rails.application.routes.draw do

  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
    mount Sidekiq::Web => "/sidekiq"
  end

  get "/health", to: proc { [200, {}, ['ok']] }

  post "/graphql", to: "graphql#execute"

  devise_for :users


  namespace :admin do
    mount Sidekiq::Web => "/sidekiq"
    resources :cogs
    resources :blocks
    resources :cards do
      delete :attachment, on: :member, action: :destroy_attachment
    end
    resources :roles
    resources :users do
      delete :attachment, on: :member, action: :destroy_attachment
    end
    resources :organizations do
      delete :attachment, on: :member, action: :destroy_attachment
    end
    resources :custom_prompts, only: [:index, :edit, :update, :show]
    resources :prompt_trails, only: [:index, :show]

    root to: "cogs#index"
  end

  root "home#index"
end
