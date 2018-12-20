class PagesController < ApplicationController
  before_action :authorize

  def show
    render template: "pages/#{params[:page]}"
  end
end
