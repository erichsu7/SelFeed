SelFeed.Views.PictureShow = Backbone.CompositeView.extend({
  template: JST["pictures/picture_show"],
  className: "picture-show-view",

  render: function () {
    var renderedContent = this.template({ picture: this.model });
    this.$el.html(renderedContent);

    return this;
  }
});
