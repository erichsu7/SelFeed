Rails.application.routes.draw do
  root "static_pages#root"

  resources :users, only: [:new, :create, :edit, :update, :destroy, :show]
  resource :session, only: [:new, :create, :destroy]
end
