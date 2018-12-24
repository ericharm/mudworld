class CreateDoors < ActiveRecord::Migration[5.1]
  def change
    create_table :doors do |t|
      t.integer :from
      t.integer :to
    end
  end
end
