SelFeed.Views.PictureForm = Backbone.View.extend({
  template: JST["pictures/picture_form"],

  className: "picture-form-modal",

  events: {
    "click #choose-picture": "activateFilepicker",
    "click #save-picture": "createPicture"
  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);

    return this;
  },

  activateFilepicker: function (event) {
    event.preventDefault();
    var that = this;
    filepicker.setKey("AojhAa24OTZydfKzja6UAz");
    filepicker.pick({
      mimetype: "image/*"
    }, function (Blob) {
      that.$(".filepicker-url-input").val(Blob.url);
      var $img = $("<img>");
      $img.addClass("picture-preview");
      $img.attr("src", Blob.url);
      $("#choose-picture").remove();
      that.$(".filepicker-widget").append($img);
    });
  },

  createPicture: function (event) {
    event.preventDefault();
    var that = this;
    var params = this.$("form").serializeJSON();
    // var currentUserId = $(".current-user-data").data("current-user-id");
    // params.picture.author_id = currentUserId;
    var picture = new SelFeed.Models.Picture(params);
    picture.save({}, {
      success: function () {
        that.collection.add(picture, { merge: true });
        Backbone.history.navigate("", { trigger: true });
      },
      error: function (model, response) {
        debugger;
      }
    })
  }
})
