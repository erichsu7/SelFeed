class StaticPagesController < ApplicationController
  before_action :redirect_if_logged_out

  def root
    render :root
  end
end
