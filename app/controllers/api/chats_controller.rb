module Api
  class ChatsController < ApplicationController
    before_action :authorize
 
    def create
      user = current_user
      ActionCable.server.broadcast 'chats', {
        type: 'message', location: user.location_id, message: params[:message], from: user.safe
      }
      render json: { status: 200, message: 'Success' }
    end

  end
end
