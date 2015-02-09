module Api
  class UsersController < ApiController
    def show
      @user = User.find(params[:id])

      render "show"
    end
  end
end
