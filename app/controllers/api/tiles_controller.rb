module Api
  class TilesController < ApplicationController
    before_action :authorize

    def create
      user = User.find(params[:user_id])
      direction = params[:message]
      obstructing_tiles = Tile.reserve_tiles(user.x, user.y, direction)
      obstructing_tiles_error(obstructing_tiles) and return if obstructing_tiles.length > 0
      tile = Tile.dig(from: { x: user.x, y: user.y }, in: user.location_id, towards: direction)
      if tile
        ActionCable.server.broadcast 'minimap', { type: 'dig', tile: tile }
        render json: { status: 200, message: 'Success', data: { tile: tile, user: user } }
      else
        tile_creation_error
      end
    end

    private

    def obstructing_tiles_error(tiles)
      render json: { status: 400, message: 'Error', data: tiles }
    end

    def tile_creation_error
      render json: { status: 400, message: 'Error', data: 'Could not create new tile' }
    end
  end
end

