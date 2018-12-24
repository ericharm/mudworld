class User < ApplicationRecord
  attr_accessor :tile
  has_secure_password
  belongs_to :location
  validates :password, presence: true, if: Proc.new { |user| user.password.present? }, confirmation: true, on: :update
  validates :email, presence: true, uniqueness: true
  validates :color, presence: true
  validates :username, presence: true, uniqueness: true
  scope :safe, -> { select(:id, :location_id, :color, :x, :y) }

  def safe
    attributes.except('password_digest', 'token', 'email')
  end

  def connect
    update(connected: true)
    ActionCable.server.broadcast 'chats', { type: 'connection', room: location_id, user: safe }
    ActionCable.server.broadcast 'minimap', { type: 'connection', room: location_id, user: safe }
  end

  def disconnect
    update(connected: false)
    ActionCable.server.broadcast 'chats', { type: 'disconnection', room: location_id, user: safe }
    ActionCable.server.broadcast 'minimap', { type: 'disconnection', room: location_id, user: safe }
  end

  def move(direction)
    new_x = x + direction[:x]
    new_y = y + direction[:y]
    tile = location.tiles.where(x: new_x, y: new_y).first
    if tile
      update(x: x + direction[:x], y: y + direction[:y])
      ActionCable.server.broadcast 'minimap', { type: 'move', user: safe }
    elsif door = location.doors.where(x: new_x, y: new_y).first
      enter_door(door, direction)
    end
  end

  private

    def enter_door(door, direction)
      from = self.location_id == door.from ? door.from : door.to
      to = from == door.from ? door.to : door.from
      ActionCable.server.broadcast 'minimap', { type: 'exit', room: from, user: safe }
      update(location_id: to)
      ActionCable.server.broadcast 'minimap', { type: 'enter', room: to, user: safe }
      move({ x: (direction[:x] * 2), y: (direction[:y] * 2) })
    end
end
