class Tile < ApplicationRecord
  belongs_to :location
  validates_uniqueness_of :x, scope: :y

  def self.reserve_tiles(x, y, direction)
    location_id = Tile.find_by(x: x, y: y).location_id
    neighbors = self.neighbors_for_new_tile(x, y, direction.to_sym)
    Tile.where(x: neighbors[:x], y: neighbors[:y]).where.not(location_id: location_id)
  end

  def self.dig(args)
    tile_position = self.new_tile_position(args)
    Tile.create(x: tile_position[:x], y: tile_position[:y], location_id: args[:in])
  end

  private

  def self.neighbors_for_new_tile(x, y, direction)
    {
      up: { x: (x - 1)..(x + 1), y: (y - 2)...y },
      down: { x: (x - 1)..(x + 1), y: y..(y + 2) },
      left: { x: (x - 2)...x, y: (y - 1)..(y + 1) },
      right: { x: x..(x + 2), y: (y - 1)...(y + 1) }
    }[direction]
  end

  def self.new_tile_position(args)
    x = args[:from][:x]
    y = args[:from][:y]
    {
      up: { x: x, y: y - 1 },
      down: { x: x, y: y + 1 },
      left: { x: x - 1, y: y },
      right: { x: x + 1, y: y }
    }[args[:towards].to_sym]
  end
end
