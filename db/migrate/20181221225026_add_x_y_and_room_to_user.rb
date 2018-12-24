class AddXYAndRoomToUser < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :x, :integer
    add_column :users, :y, :integer
    add_reference :users, :location, index: true
  end
end
