SelFeed.Views.CommentShow = Backbone.View.extend({
  template: JST["comments/comment_show"],
  tagName: "li",
  className: "picture-comment-show-view",

  render: function () {
    var renderedContent = this.template({ comment: this.model });
    this.$el.html(renderedContent);

    return this;
  }
})
