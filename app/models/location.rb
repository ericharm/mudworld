class Location < ApplicationRecord
  has_many :tiles, dependent: :destroy
  has_many :users, -> { where(connected: true).select(:id, :location_id, :color, :x, :y) }, class_name: 'User'
  validates :name, presence: true, uniqueness: true

  def doors
    Door.where(from: id).or(Door.where(to: id))
  end
end
