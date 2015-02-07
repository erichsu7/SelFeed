module Api
  class FollowsController < ApplicationController
    def create
      @follow = current_user.follows.new(follow_params)

      if @follow.save
        render json: @follow
      else
        render json: @follow.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      @follow = current_user.follows.find(params[:id])

      @follow.destroy if @follow
      render json: {}
    end

    private
      def follow_params
        params.require(:follow).permit(:followee_id)
      end
  end
end
