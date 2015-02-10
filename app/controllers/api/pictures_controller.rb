module Api
  class PicturesController < ApiController

    def index
      @pictures = current_user.authored_pictures
      current_user.followed_users.each do |followed_user|
        @pictures += followed_user.authored_pictures
      end

      render "index"
    end

    def show
      @picture = Picture.includes(:author, :likes, comments: [:commenter]).find(params[:id])

      render "show"
    end

    def create
      @picture = current_user.authored_pictures.new(picture_params)

      if @picture.save
        render "show"
      else
        render json: @picture.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      @picture = current_user.authored_pictures.find(params[:id])
      @picture.try(:destroy)
      render json: {}
    end

    private
      def picture_params
        params.require(:picture).permit(:url, :caption, :filter)
      end
  end
end
