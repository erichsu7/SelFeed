SelFeed.Views.PictureShow = Backbone.CompositeView.extend({
  template: JST["pictures/picture_show"],
  tagName: "li",

  render: function () {
    var renderedContent = this.template({ picture: this.model });
    this.$el.html(renderedContent);

    return this;
  }
})
