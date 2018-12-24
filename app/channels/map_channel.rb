class MapChannel < ApplicationCable::Channel
  def subscribed
    stream_from "minimap"
  end

  def unsubscribed
    # user = User.find(session[:user_id])
    # ActionCable.server.broadcast 'minimap', { type: 'disconnection', room: user.location_id, user: user.safe }
  end
end

