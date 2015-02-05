SelFeed.Views.PictureForm = Backbone.View.extend({
  template: JST["pictures/picture_form"],

  className: "picture-form-modal",

  events: {
    "click #save-picture": "createPicture"
  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    this.activateCloudinary();

    return this;
  },

  activateCloudinary: function () {
    $.cloudinary.config({cloud_name: "selfeed", api_key: "949363288817392"});
    var that = this;
    this.$('.cloudinary-widget').html($.cloudinary.unsigned_upload_tag("fuywh6de",
      { cloud_name: 'selfeed' }));
    this.$(".cloudinary_fileupload").on("cloudinarydone", function(event, data) {
      var $img = $.cloudinary.image(data.result.public_id);
      $img.addClass("picture-preview");
      that.$(".cloudinary-widget").html($img);
    })

  },

  createPicture: function (event) {
    event.preventDefault();
    var that = this;
    var params = this.$("form").serializeJSON();
    var picture = new SelFeed.Models.Picture(params);
    picture.save({}, {
      success: function () {
        that.collection.add(picture, { merge: true });
        Backbone.history.navigate("", { trigger: true });
      }
    })
  }
})
