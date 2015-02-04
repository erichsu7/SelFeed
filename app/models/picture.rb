class Picture < ActiveRecord::Base
    validates :filepicker_url, :author_id, presence: true
    validates :filepicker_url, uniqueness: true

    belongs_to :author,
      class_name: "User",
      foreign_key: :author_id
end
