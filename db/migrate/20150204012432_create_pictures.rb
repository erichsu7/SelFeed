class CreatePictures < ActiveRecord::Migration
  def change
    create_table :pictures do |t|
      t.string :filepicker_url, null: false
      t.integer :author_id, null: false
      t.text :caption

      t.timestamps null: false
    end

    add_index :pictures, :author_id
    add_index :pictures, :filepicker_url, unique: true
  end
end
