# Schema Information

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, unique
password_digest | string    | not null
session_token   | string    | not null, unique

## pictures
column name     | data type | dwetails
----------------|-----------|-----------------------
id              | integer   | not null, primary key
url  | string    | not null
author_id       | integer   | not null, foreign key
caption         | text      |

## comments
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
commenter_id    | integer   | not null, foreign key
picture_id      | integer   | not null, foreign key
body            | text      | not null

## likes
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
liker_id        | integer   | not null, foreign key
picture_id      | integer   | not null, foreign key

## follows
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
follower_id     | integer   | not null, foreign key
followed_id     | integer   | not null, foreign key
