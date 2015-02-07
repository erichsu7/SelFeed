class Comment < ActiveRecord::Base
  validates :commenter_id, :picture_id, :body, presence: true

  belongs_to :picture

  belongs_to :commenter,
    class_name: "User",
    foreign_key: :commenter_id
end
