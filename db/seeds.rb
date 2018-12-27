home_location = Location.find_or_create_by(name: 'home')
(0...10).each do |x|
  (0...10).each do |y|
    Tile.create(x: x, y: y, location_id: home_location.id)
  end
end

tile = home_location.tiles.first

User.create(
  username: 'admin',
  email: 'mudworld@example.com',
  password: 'password',
  password_confirmation: 'password',
  location_id: home_location.id,
  color: '#ff00ff',
  x: tile.x,
  y: tile.y
)

other_location = Location.find_or_create_by(name: 'overhere')
(11...21).each do |x|
  (0...10).each do |y|
    Tile.create(x: x, y: y, location_id: other_location.id)
  end
end

first = Location.find_by_name('home')
second = Location.find_by_name('overhere')
Door.create(x: 10, y: 4, from: first.id, to: second.id)
