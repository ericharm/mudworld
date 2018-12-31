class Location < ApplicationRecord
  has_many :tiles, dependent: :destroy
  has_many :users, -> { where(connected: true).select(:id, :location_id, :color, :x, :y) }, class_name: 'User'
  validates :name, presence: true, uniqueness: true

  def self.create_with_tiles_and_door(x, y, direction, name)
    location = self.create(name: name)
    if location
      tile_range = self.tile_range_for_new_location(x, y, direction)
      tile_range[:x].each do |x_|
        tile_range[:y].each do |y_|
        Tile.create(x: x_, y: y_, location_id: location.id)
      end
      end
      from = Tile.find_by(x: x, y: y).location_id
      door = self.door_location(x, y, direction)
      Door.create(from: from, to: location.id, x: door[:x], y: door[:y])
    end
    location
  end

  def self.reserve_tiles(x, y, direction)
    perimeter_range = self.perimeter_range_for_new_location(x, y, direction)
    Tile.where(x: perimeter_range[:x], y: perimeter_range[:y])
  end

  def doors
    Door.where(from: id).or(Door.where(to: id))
  end

  def neighbor_tiles
    neighbor_locations = doors.reduce([]) do |memo, d|
      memo.concat([d.to, d.from])
      memo.reject { |door_id| door_id == id  }
    end
    Tile.where(location_id: neighbor_locations)
  end

  private

  def self.door_location(x, y, direction)
    {
      above: { x: x, y: y - 1 },
      below: { x: x, y: y + 1 },
      left: { x: x - 1, y: y },
      right: { x: x + 1, y: y }
    }[direction]
  end

  def self.tile_range_for_new_location(x, y, direction)
    {
      above: { x: (x - 1)..(x + 1), y: (y - 4)..(y - 2) },
      below: { x: (x - 1)..(x + 1), y: (y + 2)..(y + 4) },
      left: { x: (x - 4)..(x - 2), y: (y - 1)..(y + 1) },
      right: { x: (x + 2)..(x + 4), y: (y - 1)..(y + 1) }
    }[direction]
  end

  def self.perimeter_range_for_new_location(x, y, direction)
    {
      above: { x: (x - 2)..(x + 2), y: (y - 5)...y },
      below: { x: (x - 2)..(x + 2), y: (y + 1)..(y + 5) },
      left: { x: (x - 5)...x, y: (y - 2)..(y + 2) },
      right: { x: (x + 1)..(x + 5), y: (y - 2)...(y + 2) }
    }[direction]
  end
end
