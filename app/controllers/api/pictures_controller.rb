module Api
  class PicturesController < ApiController

    def index
      if(params[:all_pictures])
        @pictures = Picture.last(100)
      else
        @pictures = current_user.followed_pictures.page(1).per(10)
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
        params.require(:picture).permit(:url, :caption, :filter, :latitude, :longitude)
      end
  end
end
