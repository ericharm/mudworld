module Api
  class LocationsController < ApplicationController
    before_action :authorize
 
    def index
      ActionCable.server.broadcast 'chats', { message: 'hello sockets' }
      render json: { status: 200, message: 'Success', data: 'ok' }
    end

    def show
      home_location = Location.find_by_name('home').as_json(include: [:tiles])
      render json: { status: 200, message: 'Success', data: home_location }
    end

  end
end
