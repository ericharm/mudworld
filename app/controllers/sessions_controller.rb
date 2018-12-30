class SessionsController < ApplicationController
  def new
    redirect_to root_path if session[:user_id]
  end

  def create
    @user = User.find_by_email(params[:email])
    session[:user_id] = @user.id if @user and @user.authenticate(params[:password])
    redirect_to root_path
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_path
  end
end
