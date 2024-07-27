Rails.application.routes.draw do
  # API routes should be in /api/v1
  namespace :api do
    namespace :v1 do
      resources :posts
    end
  end

  get 'up' => 'rails/health#show', as: :rails_health_check
end
