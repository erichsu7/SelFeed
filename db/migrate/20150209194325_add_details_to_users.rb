class AddDetailsToUsers < ActiveRecord::Migration
  def change
    add_column :users, :avatar_url, :string
    add_column :users, :display_name, :string
    add_column :users, :bio, :text
  end
end
