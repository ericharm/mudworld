module Api
  class LocationsController < ApplicationController
    before_action :authorize

    def show
      location = Location.find(params[:id]) || Location.find_by_name('home') unless location
      render json: {
        status: 200,
        message: 'Success',
        data: location.as_json(include: [:tiles, :users, :doors, :neighbor_tiles])
      }
    end

    def create
      user = User.find(params[:user_id])
      name = params[:message]
      duplication_name_error(name) and return if Location.find_by_name(name)

      tiles = user.neighbor_tiles
      direction = tiles.key(nil)
      has_multiple_possible_door_locations = tiles.compact.count < 3

      if !direction || has_multiple_possible_door_locations
        bad_starting_location_error and return
      end

      needed_tiles = Location.reserve_tiles(user.x, user.y, direction)
      obstructing_tiles_error(needed_tiles) and return if needed_tiles.length > 0

      new_location = Location.create_with_tiles_and_door(user.x, user.y, direction, name)
      ActionCable.server.broadcast 'minimap', {
        type: 'build', location: new_location, user: user.safe
      }
      render json: { status: 200, message: 'Success', data: new_location }
    end

    private

    def duplication_name_error(name)
      render json: {
        status: 400,
        message: 'Error',
        data: "A location name '#{name}' already exists"
      }
    end

    def bad_starting_location_error
      render json: {
        status: 400,
        message: 'Error',
        data: 'Must have 3 adjacent room tiles and one adjacent wall to create a new location'
      }
    end

    def obstructing_tiles_error(needed_tiles)
      render json: {
        status: 400,
        message: 'Error',
        data: needed_tiles
      }   
    end
  end
end
