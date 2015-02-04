SelFeed.Views.PictureForm = Backbone.View.extend({
  template: JST["pictures/picture_form"],

  className: "picture-form-modal",

  activateFilepicker: function () {
    filepicker.setKey("AojhAa24OTZydfKzja6UAz");
    var $filepickerEl = this.$('#filepicker-input');
    filepicker.constructWidget($filepickerEl[0]);
  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    this.activateFilepicker();

    return this;
  }
})
