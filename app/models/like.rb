class Like < ActiveRecord::Base
  validates :liker_id, :picture_id, presence: true
  validates :liker_id, uniqueness: { scope: :picture_id }

  belongs_to :picture

  belongs_to :liker,
    class_name: "User",
    foreign_key: :liker_id
end
