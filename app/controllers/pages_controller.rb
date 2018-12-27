class PagesController < ApplicationController
  before_action :authorize

  def show
    page = params[:page]
    # connect_user if page == 'home'
    render template: "pages/#{page}"
  end

  private
    def connect_user
      user = current_user
      cookies.signed[:user_id] = user.id
      user.connect
    end
end
