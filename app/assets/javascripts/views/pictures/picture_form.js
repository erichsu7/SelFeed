SelFeed.Views.PictureForm = Backbone.View.extend({
  template: JST["pictures/picture_form"],

  className: "picture-form-modal",

  events: {},

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    this.activateFilepicker();

    return this;
  },

  activateFilepicker: function () {
    var that = this;
    filepicker.setKey("AojhAa24OTZydfKzja6UAz");
    filepicker.pick({
      mimetype: "image/*"
    }, function (Blob) {
      that.$(".filepicker-url-input").val(Blob.url);
      var $img = $("<img>");
      $img.addClass("picture-preview");
      $img.attr("src", Blob.url);
      that.$(".filepicker-widget").append($img);
    });



    // var $filepickerEl = this.$('#filepicker-input');
    // filepicker.constructWidget($filepickerEl[0]);
  },
})
