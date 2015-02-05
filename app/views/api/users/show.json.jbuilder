json.author do
  json.extract! @user, :id, :username
end

json.pictures @user.authored_pictures
