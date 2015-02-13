class SessionsController < ApplicationController
  before_action :redirect_if_logged_in, only: [:new, :create]

  def new
    render :new
  end

  def create
    user = User.find_by_credentials(params[:user][:username], params[:user][:password])

    if user
      log_in!(user)
      redirect_to root_url
    else
      flash[:errors] = [["username/password combination", ["is invalid"]]]
      redirect_to new_session_url
    end
  end

  def destroy
    log_out!
    render json: {}
  end
end
