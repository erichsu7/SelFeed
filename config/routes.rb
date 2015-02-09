Rails.application.routes.draw do
  root "static_pages#root"

  resources :users, only: [:new, :create, :destroy]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: { format: :json } do
    resources :pictures, only: [:show, :index, :create, :destroy ]
    resources :users, only: [:show, :update]
    resources :likes, only: [:create, :destroy]
    resources :comments, only: [:create, :destroy]
    resources :follows, only: [:create, :destroy]
  end
end
