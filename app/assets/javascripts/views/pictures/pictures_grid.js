SelFeed.Views.PicturesGrid = Backbone.CompositeView.extend({
  template: JST["pictures/pictures_grid"],
  className: "pictures-grid-view",

  initialize: function () {
    var that = this;
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, "add", this.addPicture);
    this.listenTo(this.collection, "remove", this.removePicture);
    this.listenTo(SelFeed.Events.event_bus, "savePicture", this.prependPicture);
    this.collection.each(function (picture) {
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
    var gridItem = new SelFeed.Views.PicturesGridItem({ model: picture });
    this.addSubview(".pictures-grid-list", gridItem);
  },

  prependPicture: function (picture) {
    var gridItem = new SelFeed.Views.PicturesGridItem({ model: picture });
    this.prependSubview(".pictures-grid-list", gridItem);
  },

  removePicture: function (picture) {
    var that = this;
    var gridItem;
    _(this.subviews()).each(function (subviews) {
      gridItem = _.findWhere(subviews, { model: picture });
      if (gridItem) {
        that.removeSubview(".pictures-grid-list", gridItem);
      }
    })
  }

})
