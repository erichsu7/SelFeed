class Follow < ActiveRecord::Base
  validates :follower_id, :followee_id, presence: true
  validates :follower_id, uniqueness: { scope: :followee_id }
  validate :current_user_cannot_follow_self

  belongs_to :follower,
    class_name: "User",
    foreign_key: :follower_id

  belongs_to :followee,
    class_name: "User",
    foreign_key: :followee_id

  def current_user_cannot_follow_self
    if follower_id == followee_id
      errors.add(:follower_id, "can't be the same as followee_id" )
    end
  end
end
