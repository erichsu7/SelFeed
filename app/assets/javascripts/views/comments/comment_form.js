SelFeed.Views.CommentForm = Backbone.View.extend({
  template: JST["comments/comment_form"],
  tagName: "form",
  className: "comments-form",

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
    var currentUserUsername = $(".current-user-data").data("current-user-username");
    params.comment.picture_id = this.picture.id;
    params.comment.commenter_username = currentUserUsername;
    var comment = new SelFeed.Models.Comment(params.comment);
    comment.save({}, {
      success: function () {
        that.collection.add(comment, {merge: true});
      }
    })
  }
})
