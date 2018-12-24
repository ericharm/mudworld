module Api
  class LocationsController < ApplicationController
    before_action :authorize

    def show
      location = Location.find(params[:id]) || Location.find_by_name('home') unless location
      render json: {
        status: 200,
        message: 'Success',
        data: location.as_json(include: [:tiles, :users, :doors])
      }
    end

  end
end
