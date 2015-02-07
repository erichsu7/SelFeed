class Picture < ActiveRecord::Base
  validates :url, :author_id, presence: true
  validates :url, uniqueness: true

  belongs_to :author,
    class_name: "User",
    foreign_key: :author_id

  has_many :likes

  has_many :comments
end
