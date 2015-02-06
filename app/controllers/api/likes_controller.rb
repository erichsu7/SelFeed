module Api
  class LikesController < ApplicationController
    def create
      @like = Like.new(like_params)

      if @like.save
        render json: @like
      else
        render json: {}
      end
    end

    def destroy
      @like = Like.find(params[:id])
      @like.destroy
      render json: {}
    end

    private
      def like_params
        params.require(:like).permit(:liker_id, :picture_id)
      end
  end
end
