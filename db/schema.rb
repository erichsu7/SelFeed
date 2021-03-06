# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150221093130) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comments", force: :cascade do |t|
    t.integer  "commenter_id", null: false
    t.integer  "picture_id",   null: false
    t.text     "body",         null: false
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  add_index "comments", ["commenter_id"], name: "index_comments_on_commenter_id", using: :btree
  add_index "comments", ["picture_id"], name: "index_comments_on_picture_id", using: :btree

  create_table "follows", force: :cascade do |t|
    t.integer  "follower_id", null: false
    t.integer  "followee_id", null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "follows", ["follower_id", "followee_id"], name: "index_follows_on_follower_id_and_followee_id", unique: true, using: :btree

  create_table "likes", force: :cascade do |t|
    t.integer  "liker_id",   null: false
    t.integer  "picture_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "likes", ["liker_id", "picture_id"], name: "index_likes_on_liker_id_and_picture_id", unique: true, using: :btree
  add_index "likes", ["picture_id"], name: "index_likes_on_picture_id", using: :btree

  create_table "pictures", force: :cascade do |t|
    t.string   "url",                         null: false
    t.integer  "author_id",                   null: false
    t.text     "caption"
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
    t.string   "filter",     default: "none"
    t.float    "latitude"
    t.float    "longitude"
  end

  add_index "pictures", ["author_id"], name: "index_pictures_on_author_id", using: :btree
  add_index "pictures", ["latitude"], name: "index_pictures_on_latitude", using: :btree
  add_index "pictures", ["longitude"], name: "index_pictures_on_longitude", using: :btree
  add_index "pictures", ["url"], name: "index_pictures_on_url", unique: true, using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "username",        null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.string   "avatar_url"
    t.string   "display_name"
    t.text     "bio"
    t.datetime "last_log_in"
  end

  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

end
