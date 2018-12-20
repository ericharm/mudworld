class CreateTiles < ActiveRecord::Migration[5.1]
  def change
    create_table :tiles do |t|
      t.integer :x
      t.integer :y
      t.belongs_to :location, foreign_key: true

      t.timestamps
    end
  end
end
