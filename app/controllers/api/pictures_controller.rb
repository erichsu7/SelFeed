module Api
  class PicturesController < ApiController

    def index
      @pictures = current_user.authored_pictures
      render json: @pictures
    end

    def show
      @picture = Picture.find(params[:id])
      render json: @picture
    end

    def create
      @picture = current_user.authored_pictures.new(picture_params)

      if @picture.save
        render json: @picture
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
        params.require(:picture).permit(:filepicker_url, :author_id, :caption)
      end
  end
end
