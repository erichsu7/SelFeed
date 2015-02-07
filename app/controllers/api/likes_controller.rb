module Api
  class LikesController < ApiController
    def create
      @like = current_user.likes.new(like_params)

      if @like.save
        render json: @like
      else
        render json: @like.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      @like = current_user.likes.find(params[:id])

      @like.destroy if @like
      render json: {}
    end

    private
      def like_params
        params.require(:like).permit(:picture_id)
      end
  end
end
