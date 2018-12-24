class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chats"
  end

  def unsubscribed
    self.current_user.disconnect
  end
end
