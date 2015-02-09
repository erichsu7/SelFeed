SelFeed.Views.UserShow = Backbone.CompositeView.extend({
  template: JST["users/user_show"],
  className: "user-show-view",

  initialize: function () {
    this.addUserHeader();
    this.addPicturesGrid();
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

  addPicturesGrid: function () {
    var picturesGrid =
      new SelFeed.Views.PicturesGrid({ collection: this.model.pictures() });
    this.addSubview(".pictures-grid-container", picturesGrid);
  }
});
