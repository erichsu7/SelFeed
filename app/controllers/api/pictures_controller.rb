module Api
  class PicturesController < ApiController

    def index
      @pictures = current_user.authored_pictures
      current_user.followed_users.each do |followed_user|
        @pictures += followed_user.authored_pictures
      end

      @pictures = @pictures.to_a.sort { |picture| picture.id }

      render "index"
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
        params.require(:picture).permit(:url, :caption)
      end
  end
end
