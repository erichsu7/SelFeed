SelFeed.Views.CommentsFeed = Backbone.CompositeView.extend({
  template: JST["comments/comments_feed"],
  className: "picture-comments-view",

  initialize: function () {
    var that = this;
    this.listenTo(this.collection, "add", this.addComment);
    this.listenTo(this.collection, "remove", this.removeComment);
    this.collection.each(function (comment) {
      that.addComment(comment);
    });
  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    this.attachSubviews();
    this.addCommentForm();

    return this;
  },

  addComment: function (comment) {
    var showView = new SelFeed.Views.CommentShow({ model: comment });
    this.addSubview(".picture-comments-list", showView);
  },

  removeComment: function (comment) {
    var that = this;
    var showView;
    _(this.subviews()).each(function (subviews) {
      showView = _.findWhere(subviews, { model: comment });
      if (showView) {
        that.removeSubview(".picture-comments-list", showView);
      }
    })
  },

  addCommentForm: function () {
    var formView = new SelFeed.Views.CommentForm({ collection: this.collection });
    this.addSubview(".picture-comments-form-container", formView);
  }
});
