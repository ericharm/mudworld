class Door < ApplicationRecord
  def locations
    Location.where(id: from).or(Location.where(id: to)).as_json(include: :tiles)
  end
end
