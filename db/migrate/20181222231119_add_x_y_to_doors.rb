class AddXYToDoors < ActiveRecord::Migration[5.1]
  def change
    add_column :doors, :x, :integer
    add_column :doors, :y, :integer
  end
end
