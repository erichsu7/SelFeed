SelFeed.Views.CommentShow = Backbone.View.extend({
  template: JST["comments/comment_show"],
  tagName: "li",
  className: "picture-comment-show-view",

  events: {
    "click .author-link": "showUser"
  },

  render: function () {
    var renderedContent = this.template({ comment: this.model });
    this.$el.html(renderedContent);

    return this;
  },

  showUser: function (event) {
    event.preventDefault();
    var $target = $(event.target);
    var url = "users/" + $target.data("commenter-id");
    Backbone.history.navigate(url, { trigger: true });
  }
})
