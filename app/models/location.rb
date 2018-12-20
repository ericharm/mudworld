class Location < ApplicationRecord
  has_many :tiles, dependent: :destroy
  validates :name, presence: true, uniqueness: true
end
