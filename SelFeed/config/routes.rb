Rails.application.routes.draw do
  resources :users, only: [:new, :create, :edit, :update, :destroy, :show]
  resources :sessions, only: [:new, :create, :destroy]
end
