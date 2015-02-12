class User < ActiveRecord::Base
  attr_reader :password

  validates :username, :password_digest, :session_token, presence: true
  validates :username, :session_token, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }

  after_initialize :ensure_session_token

  has_many :authored_pictures,
  -> { order "created_at DESC" },
    class_name: "Picture",
    foreign_key: :author_id


  has_many :likes,
    foreign_key: :liker_id

  has_many :liked_pictures,
    through: :likes,
    source: :picture

  has_many :comments,
    foreign_key: :commenter_id

  has_many :follows,
    class_name: "Follow",
    foreign_key: :follower_id

  has_many :followings,
    class_name: "Follow",
    foreign_key: :followee_id

  has_many :followed_users,
    through: :follows,
    source: :followee

  has_many :followers,
    through: :followings,
    source: :follower

  def self.find_by_credentials(username, password)
    user = User.find_by_username(username)
    return nil unless user

    user.is_password?(password) ? user : nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = self.class.generate_session_token
    self.save!
    self.session_token
  end

  def self.generate_session_token
    SecureRandom::urlsafe_base64
  end

  def likes?(picture)
    self.liked_pictures.include?(picture)
  end

  def follows?(user)
    self.followed_users.include?(user)
  end

  private
    def ensure_session_token
      self.session_token ||= self.class.generate_session_token
    end
end
