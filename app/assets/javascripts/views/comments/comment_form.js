SelFeed.Views.CommentForm = Backbone.View.extend({
  template: JST["comments/comment_form"],
  tagName: "form",
  className: "comments-form clearfix",

  events: {
    "submit": "createComment"
  },

  initialize: function (options) {
    this.picture = options.picture;
  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);

    return this;
  },

  createComment: function (event) {
    event.preventDefault();
    var that = this;
    var params = this.$el.serializeJSON();
    if (params.comment.body === "") {return};
    var currentUserUsername = $(".current-user-data").data("current-user-username");
    params.comment.picture_id = this.picture.id;
    params.comment.commenter_username = currentUserUsername;
    var comment = new SelFeed.Models.Comment(params.comment);
    comment.save();
    this.$(".comment-body").val("");
    var currentUserAvatarUrl = $(".current-user-data").data("current-user-avatar-url");
    comment.set("commenter_avatar_url", currentUserAvatarUrl);
    this.collection.add(comment, { merge: true });
  }
})
