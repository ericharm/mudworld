class Location < ApplicationRecord
  has_many :tiles, dependent: :destroy
  has_many :users, -> { where(connected: true).select(:id, :location_id, :color, :x, :y) }, class_name: 'User'
  validates :name, presence: true, uniqueness: true

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
end
