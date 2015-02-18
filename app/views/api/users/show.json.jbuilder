json.extract! @user, :id, :username, :avatar_url, :display_name, :bio, :created_at, :updated_at
if current_user.follows?(@user)
  json.follow @user.followings.find_by_follower_id(current_user.id)
end
json.followers_count @user.followers.length
json.followed_users_count @user.followed_users.length


json.pictures @user.authored_pictures do |picture|
  json.extract! picture, :id, :url, :author_id, :caption, :filter, :created_at, :updated_at
  json.author_username @user.username
  json.author_avatar_url @user.avatar_url
  if current_user.likes?(picture)
    json.like current_user.likes.find_by_picture_id(picture.id)
  end
  json.likes picture.likes
  json.comments picture.comments do |comment|
    json.extract! comment, :id, :commenter_id, :picture_id, :body, :created_at, :updated_at
    json.commenter_username comment.commenter.username
    json.commenter_avatar_url comment.commenter.avatar_url
  end
end
