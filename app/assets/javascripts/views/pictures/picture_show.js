SelFeed.Views.PictureShow = Backbone.CompositeView.extend({
  template: JST["pictures/picture_show"],
  tagName: "li",
  className: "picture-show-container",

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
    this.addSubview(".picture-likes-container", showView);
  },

  addCommentsFeed: function () {
    var feedView = new SelFeed.Views.CommentsFeed({ collection: this.model.comments(), picture: this.model });
    this.addSubview(".picture-comments-container", feedView);
  }
})
