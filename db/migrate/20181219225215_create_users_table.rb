class CreateUsersTable < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :email
      t.string :password_digest
      t.string :token
      t.string :username

      t.timestamps
    end
  end
end
