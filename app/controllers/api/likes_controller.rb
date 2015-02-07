module Api
  class LikesController < ApiController
    def create
      @like = Like.new(like_params)
      @like.liker_id = current_user.id

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
        params.require(:like).permit(:picture_id)
      end
  end
end
