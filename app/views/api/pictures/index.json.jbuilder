json.array! @pictures do |picture|
  json.extract! picture, :id, :url, :author_id, :caption, :created_at, :updated_at
  json.author_username picture.author.username
  if current_user.likes?(picture)
    json.like current_user.likes.find_by_picture_id(picture.id)
  end
  json.likes picture.likes
  json.comments picture.comments do |comment|
    json.extract! comment, :id, :commenter_id, :picture_id, :body, :created_at, :updated_at
    json.commenter_username comment.commenter.username
  end
end
