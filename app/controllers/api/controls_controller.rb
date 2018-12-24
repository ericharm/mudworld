module Api
  class ControlsController < ApplicationController
    before_action :authorize
    @@directions = {
      'w' => { x: 0, y: -1 },
      'a' => { x: -1, y: 0 },
      's' => { x: 0, y: 1 },
      'd' => { x: 1, y: 0 }
    }

    def create
      user = User.find(params[:user])
      direction = @@directions[params[:instruction]]
      user.move(direction)
      render json: { status: 200, message: 'Success' }
    end

  end
end

