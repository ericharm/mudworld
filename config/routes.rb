Rails.application.routes.draw do
  root to: 'pages#show', page: 'home'
  get  '/login'   => 'sessions#new'
  post '/login'   => 'sessions#create'
  get  '/logout'  => 'sessions#destroy'

  namespace :api do
    resources :locations, only: [:index, :create, :show]
    resources :chats, only: [:create]
    resources :controls, only: [:create]
  end
end
