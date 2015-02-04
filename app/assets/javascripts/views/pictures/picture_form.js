SelFeed.Views.PictureForm = Backbone.View.extend({
  template: JST["pictures/picture_form"],
  className: "picture-form-modal",

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);

    return this;
  }
})
