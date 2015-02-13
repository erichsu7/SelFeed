class StaticPagesController < ApplicationController

  def root
    if logged_in?
      @current_user = current_user
      render :root
    else
      render :splash
    end
  end
end
