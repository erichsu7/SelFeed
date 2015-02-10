json.extract! @user, :id, :username, :avatar_url, :display_name, :bio, :created_at, :updated_at
if current_user.follows?(@user)
  json.follow @user.followings.find_by_follower_id(current_user.id)
end

json.pictures @user.authored_pictures do |picture|
  json.extract! picture, :id, :url, :author_id, :caption, :created_at, :updated_at
  json.author_username @user.username
  if current_user.likes?(picture)
    json.like current_user.likes.find_by_picture_id(picture.id)
  end
  json.likes picture.likes
  json.comments picture.comments do |comment|
    json.extract! comment, :id, :commenter_id, :picture_id, :body, :created_at, :updated_at
    json.commenter_username comment.commenter.username
  end
end
