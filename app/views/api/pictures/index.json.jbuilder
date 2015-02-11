json.array! @pictures do |picture|
  json.extract! picture, :id, :url, :author_id, :caption, :filter, :latitude, :longitude, :created_at, :updated_at
  json.author_id picture.author.id
  json.author_username picture.author.username
  json.author_avatar_url picture.author.avatar_url
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
