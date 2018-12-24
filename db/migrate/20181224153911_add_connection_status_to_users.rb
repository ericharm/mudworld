class AddConnectionStatusToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :connected, :boolean, default: false
  end
end
