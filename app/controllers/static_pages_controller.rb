class StaticPagesController < ApplicationController
  before_action :redirect_if_logged_out

  def root
    @current_user = current_user

    render :root
  end
end
