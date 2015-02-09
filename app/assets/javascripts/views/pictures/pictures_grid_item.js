SelFeed.Views.PicturesGridItem = Backbone.View.extend({
  template: JST["pictures/pictures_grid_item"],
  tagName: "li",
  className: "pictures-grid-item-container",

  render: function () {
    var renderedContent = this.template({ picture: this.model });
    this.$el.html(renderedContent);

    return this;
  }
})
