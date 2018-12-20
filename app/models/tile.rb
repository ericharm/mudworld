class Tile < ApplicationRecord
  belongs_to :location
  validates_uniqueness_of :x, scope: :y
end
