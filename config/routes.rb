Rails.application.routes.draw do
  root "static_pages#root"

  resources :users, only: [:new, :create, :edit, :update, :destroy, :show]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: { format: :json } do
    resources :pictures, only: [:show, :index, :create, :destroy ]
  end
end
