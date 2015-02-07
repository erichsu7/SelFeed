SelFeed.Views.PictureShow = Backbone.CompositeView.extend({
  template: JST["pictures/picture_show"],
  tagName: "li",
  className: "picture-show-container",

  render: function () {
    var renderedContent = this.template({ picture: this.model });
    this.$el.html(renderedContent);
    this.renderLikeShow();
    this.renderCommentsFeed();

    return this;
  },

  renderLikeShow: function () {
    var showView = new SelFeed.Views.LikeShow({ picture: this.model });
    this.addSubview(".picture-likes-container", showView);
  },

  renderCommentsFeed: function () {
    var feedView = new SelFeed.Views.CommentsFeed({ collection: this.model.comments() });
    this.addSubview(".picture-comments-container", feedView);
  }
})
