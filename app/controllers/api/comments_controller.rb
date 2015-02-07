module Api
  class CommentsController < ApiController
    def create
      @comment = current_user.comments.new(comment_params)

      if @comment.save
        render json: @comment
      else
        render json: @comment.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      @comment = current_user.comments.find(params[:id])

      @comment.destroy if @comment
      render json: {}
    end

    private
      def comment_params
        params.require(:comment).permit(:picture_id, :body)
      end
  end
end
