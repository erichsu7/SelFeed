class AddFilterToPictures < ActiveRecord::Migration
  def change
    add_column :pictures, :filter, :string, default: "none"
  end
end
