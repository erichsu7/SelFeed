SelFeed.Views.PictureFilterPalette = Backbone.View.extend({
  template: JST["pictures/picture_filter_palette"],

  className: "picture-filter-palette-view",

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);

    return this;
  }
})
