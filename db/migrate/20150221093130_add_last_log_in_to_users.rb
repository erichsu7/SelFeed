class AddLastLogInToUsers < ActiveRecord::Migration
  def change
    add_column :users, :last_log_in, :datetime
  end
end
