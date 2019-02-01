require 'test_helper'

class UserTest < ActiveSupport::TestCase
  def setup
    home_location = Location.find_or_create_by(name: 'home')
    (0...10).each do |x|
      (0...10).each do |y|
        Tile.create(x: x, y: y, location_id: home_location.id)
      end
    end

    tile = home_location.tiles.first

    @user = User.create(
      username: 'admin',
      email: 'mudworld@example.com',
      password: 'password',
      password_confirmation: 'password',
      location_id: home_location.id,
      color: '#ff00ff',
      x: tile.x,
      y: tile.y
    )
  end

  test "user can move to an adjacent tile" do
    x = @user.x
    @user.move(x: 1, y:0)
    assert_equal x+ 1, @user.x
  end

  test "user can not move through walls" do
    @user.update(x: 10)
    x = @user.x
    @user.move(x: 1, y:0)
    assert_equal x, @user.x
  end

  test "safe user doesn't show password_digest" do
    assert_respond_to @user, :password_digest
    assert_not_respond_to @user.safe, :password_digest
  end
end

