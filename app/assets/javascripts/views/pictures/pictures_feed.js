SelFeed.Views.PicturesFeed = Backbone.CompositeView.extend({
  template: JST["pictures/pictures_feed"],
  className: "pictures-feed",

  initialize: function (object) {
    var that = this;
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, "add", this.addPicture);
    this.listenTo(this.collection, "remove", this.removePicture);
    this.collection.each( function (picture) {
      that.addPicture(picture);
    });
  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    this.attachSubviews();
    return this;
  },

  addPicture: function (picture) {
    var showView = new SelFeed.Views.PictureShow({ model: picture });
    this.addSubview(".pictures-list", showView);
  },

  removePicture: function (picture) {
    var that = this;
    var showView;
    _(this.subviews()).each(function (subviews) {
      showView = _.findWhere(subviews, { model: picture });
      if (showView) {
        that.removeSubview(".pictures-list", showView);
      }
    })
  }
})
