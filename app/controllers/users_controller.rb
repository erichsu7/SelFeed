class UsersController < ApplicationController
  before_action :redirect_if_logged_in, only: [:new, :create]

  def show
    @user = User.includes(authored_pictures: [:likes, comments: [:commenter]]).find(params[:id])

    render :show
  end

  def new
    @user = User.new

    render :new
  end

  def create
    @user = User.new(user_params)

    if @user.save
      log_in!(@user)
      redirect_to root_url
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  def edit
    @user = User.find(params[:id])

    render :edit
  end

  def update
    @user = User.find(params[:id])

    if @user.update(user_params)
      redirect_to user_url(@user)
    else
      flash.now[:errors] = @user.errors.full_messages
      render :edit
    end
  end

  def destroy
    @user = User.find(params[:id])
    @user.destroy
    redirect_to root_url
  end

  private
    def user_params
      params.require(:user).permit(:username, :password)
    end
end
