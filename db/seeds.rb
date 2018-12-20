User.create(
  username: 'admin',
  email: 'mudworld@example.com',
  password: 'password',
  password_confirmation: 'password'
)

Location.create(
  name: 'home'
)

home_location = Location.find_by_name('home')

(0...10).each do |x|
  (0...10).each do |y|
    Tile.create(x: x, y: y, location_id: home_location.id)
  end
end
