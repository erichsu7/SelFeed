class CreatePictures < ActiveRecord::Migration
  def change
    create_table :pictures do |t|
      t.string :url, null: false
      t.integer :author_id, null: false
      t.text :caption

      t.timestamps null: false
    end

    add_index :pictures, :author_id
    add_index :pictures, :url, unique: true
  end
end
