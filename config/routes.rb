Rails.application.routes.draw do
  root "static_pages#root"

  resources :users, only: [:new, :create, :edit, :update, :destroy]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: { format: :json } do
    resources :pictures, only: [:show, :index, :create, :destroy ]
    resources :users, only: [:show]
    resources :likes, only: [:create, :destroy]
    resources :comments, only: [:create, :destroy]
    resources :follows, only: [:create, :destroy]
  end
end
