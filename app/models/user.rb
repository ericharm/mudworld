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
    ActionCable.server.broadcast 'minimap', socket_message({ type: 'connection'})
  end

  def disconnect
    update(connected: false)
    ActionCable.server.broadcast 'minimap', socket_message({type: 'disconnection'})
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

  def neighbor_tiles
    {
      above: Tile.where(x: x, y: y - 1).first,
      below: Tile.where(x: x, y: y + 1).first,
      left: Tile.where(x: x - 1, y: y).first,
      right: Tile.where(x: x + 1, y: y).first
    }
  end

  private

    def socket_message(params)
      params.merge(location_id: location_id, user: safe)
    end

    def enter_door(door, direction)
      from = self.location_id == door.from ? door.from : door.to
      to = from == door.from ? door.to : door.from
      ActionCable.server.broadcast 'minimap', { type: 'exit', location_id: from, user: safe }
      update(location_id: to)
      ActionCable.server.broadcast 'minimap', { type: 'enter', location_id: to, user: safe }
      move({ x: (direction[:x] * 2), y: (direction[:y] * 2) })
    end
end
