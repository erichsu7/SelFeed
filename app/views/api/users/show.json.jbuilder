json.author do
  json.extract! @user, :id, :username
end

json.pictures @user.authored_pictures do |picture|
  json.extract! picture, :id, :url, :author_id, :caption, :created_at, :updated_at
  json.author_username @user.username
end
