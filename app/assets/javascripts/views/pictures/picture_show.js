SelFeed.Views.PictureShow = Backbone.CompositeView.extend({
  template: JST["pictures/picture_show"],
  className: "picture-show-view",

  initialize: function () {
    this.addLikeShow();
    this.addCommentsFeed();
  },

  render: function () {
    var renderedContent = this.template({ picture: this.model });
    this.$el.html(renderedContent);
    this.attachSubviews();

    return this;
  },

  addLikeShow: function () {
    var showView = new SelFeed.Views.LikeShow({ picture: this.model });
    this.addSubview(".picture-show-likes-container", showView);
  },

  addCommentsFeed: function () {
    var feedView = new SelFeed.Views.CommentsFeed({ collection: this.model.comments(), picture: this.model });
    this.addSubview(".picture-show-comments-container", feedView);
  }
});
