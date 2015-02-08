SelFeed.Views.UserShow = Backbone.CompositeView.extend({
  template: JST["users/user_show"],
  className: "user-show-view",

  initialize: function () {
    this.addPicturesFeed();
  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    this.attachSubviews();

    return this;
  },

  addPicturesFeed: function () {
    var picturesFeed =
      new SelFeed.Views.PicturesFeed({ collection: this.model.pictures() });
    this.addSubview(".pictures-feed-container", picturesFeed);
  }


});
