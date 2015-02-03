Rails.application.routes.draw do
  resources :users, only: [:new, :create, :edit, :update, :destroy, :show]
  resource :session, only: [:new, :create, :destroy]
end
