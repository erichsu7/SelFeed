class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.integer :commenter_id, null: false
      t.integer :picture_id, null: false
      t.text :body, null: false

      t.timestamps null: false
    end

    add_index :comments, :commenter_id
    add_index :comments, :picture_id
  end
end
