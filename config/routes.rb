Rails.application.routes.draw do
  root to: 'pages#show', page: 'home'
  get  '/login'   => 'sessions#new'
  post '/login'   => 'sessions#create'
  get  '/logout'  => 'sessions#destroy'

  namespace :api do
    resources :locations, only: [:index, :create, :show]
  end
end
