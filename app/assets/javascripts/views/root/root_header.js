SelFeed.Views.RootHeader = Backbone.View.extend({
  template: JST["root/root_header"],
  className: "root-header-nav clearfix",

  events: {
    "click .add-picture-link": "showPictureForm"
  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);

    return this;
  },

  showPictureForm: function () {
    var pictureForm = new SelFeed.Views.PictureForm();
    $("body").append(pictureForm.render().$el);
  }
})
