module Api
  class UsersController < ApiController
    def show
      @user = User.includes(:followers, :followed_users, authored_pictures: [:likes, comments: [:commenter]]).find(params[:id])

      render "show"
    end

    def update
      @user = User.find(params[:id])

      if @user.update(user_params)
        render json: @user
      else
        render json: @user.errors.full_messages
      end
    end

    private
      def user_params
        params.require(:user).permit(:avatar_url)
      end
  end
end
