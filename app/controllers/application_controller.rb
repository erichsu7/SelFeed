class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :current_user, :logged_in?

  def current_user
    User.find_by_session_token(session[:session_token])
  end

  def logged_in?
    !current_user.nil?
  end

  def log_in!(user)
    session[:session_token] = user.reset_session_token!
    current_user.update({ last_log_in: Time.now })
  end

  def log_out!
    if current_user.is_guest?
      current_user.destroy_content_since(current_user.last_log_in)
    end
    current_user.reset_session_token!
    session[:session_token] = nil
  end

  def redirect_if_logged_out
    redirect_to new_session_url unless logged_in?
  end

  def redirect_if_logged_in
    redirect_to root_url if logged_in?
  end
end
