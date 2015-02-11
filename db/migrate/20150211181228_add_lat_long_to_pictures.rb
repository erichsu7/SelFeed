class AddLatLongToPictures < ActiveRecord::Migration
  def change
    add_column :pictures, :latitude, :float
    add_column :pictures, :longitude, :float

    add_index :pictures, :latitude
    add_index :pictures, :longitude
  end
end
