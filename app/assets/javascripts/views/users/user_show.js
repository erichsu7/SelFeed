SelFeed.Views.UserShow = Backbone.CompositeView.extend({
  template: JST["users/user_show"],
  className: "user-show-view",

  initialize: function () {
    this.addUserHeader();
    this.addPicturesFeed();
  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    this.attachSubviews();

    return this;
  },

  addUserHeader: function () {
    var userHeader = new SelFeed.Views.UserHeader({ model: this.model });
    this.addSubview(".user-header-container", userHeader);
  },

  addPicturesFeed: function () {
    var picturesFeed =
      new SelFeed.Views.PicturesFeed({ collection: this.model.pictures() });
    this.addSubview(".pictures-feed-container", picturesFeed);
  }
});
