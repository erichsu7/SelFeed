SelFeed.Views.PictureForm = Backbone.View.extend({
  template: JST["pictures/picture_form"],

  events: {
    "click #save-picture": "createPicture",
    "click #crop-picture": "updatePicture",
    "click #cancel-picture": "cancelPicture"
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
      that.scalarX = data.result.width / 400;
      that.scalarY = data.result.height / 400;
      that.pictureId = data.result.public_id;
      var $img = $.cloudinary.image(that.pictureId);
      $img.addClass("picture-preview");
      that.$(".cloudinary-widget").html($img);
      $(".picture-preview").imagesLoaded().always( function (instance) {
        that.activateJcrop();
      })
    })
  },

  activateJcrop: function () {
    var that = this;
    $.Jcrop(this.$(".picture-preview"), {
      allowSelect: true,
      allowMove: true,
      allowResize: true,
      setSelect: [0, 0, 100, 100],
      aspectRatio: 1,
      onSelect: function (cropCoords) {
        console.log(cropCoords);
        that.cropCoords = cropCoords;
        $("#crop-picture").css("display", "block")
      }
    });
  },

  createPicture: function (event) {
    event.preventDefault();
    var that = this;
    var params = this.$("form").serializeJSON();
    params.picture.url = this.pictureUrl;
    var picture = new SelFeed.Models.Picture(params);
    picture.save({}, {
      success: function () {
        that.collection.add(picture, { merge: true });
        that.remove();
        window.location = "";
      }
    })
  },

  updatePicture: function (event) {
    event.preventDefault();
    var that = this;
    // Scale selected region to size of actual image
    var scalarSquare = (this.scalarX > this.scalarY) ? this.scalarX : this.scalarY;
    debugger;
    var $img = $.cloudinary.image(this.pictureId, {
      transformation: {
        x: function () {
          return Math.round(that.cropCoords.x * scalarSquare)
        }(),
        y: function () {
          return Math.round(that.cropCoords.y * scalarSquare)
        }(),
        width: function () {
          return Math.round(that.cropCoords.w * scalarSquare)
        }(),
        height: function () {
          return Math.round(that.cropCoords.h * scalarSquare)
        }(),
        crop: "crop"
      },
      width: 500,
      height: 500,
      crop: 'fill'
    });
    $img.css({
      "width": "400px",
      "height": "400px"
    });
    this.$('.cloudinary-widget').html($img);
    this.$("#crop-picture").css("display", "none")
    this.pictureUrl = $img.attr("src");
  },

  cancelPicture: function (event) {
    event.preventDefault();
    this.remove();
  }
})
