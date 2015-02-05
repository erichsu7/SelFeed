SelFeed.Views.PicturesFeed = Backbone.CompositeView.extend({
  template: JST["pictures/pictures_feed"],
  className: "pictures-feed",

  initialize: function (object) {
    this.listenTo(this.collection, "sync", this.render)
  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);

    return this;
  }
})
