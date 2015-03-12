SelFeed.Views.AvatarForm = Backbone.View.extend({
  template: JST["pictures/avatar_form"],

  className: "picture-form-modal",

  events: {
    "click #save-picture": "saveAvatar",
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

    this.$(".cloudinary_fileupload").addClass("enable-upload");
    this.$(".cloudinary_fileupload").on("fileuploadstart", function (event, data) {
      that.$(".cloudinary_fileupload").removeClass("enable-upload");
      that.$(".cloudinary-widget").append($("<i class=\"fa fa-spinner fa-spin\" id=\"upload-progress-tracker\"></i>"));
    });
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
        that.cropCoords = cropCoords;
        $("#crop-picture").css("display", "block")
      }
    });
  },

  saveAvatar: function (event) {
    event.preventDefault();

    var $target = $(event.target);
    if ($target.attr("data-disabled") === "true") {
      return;
    }

    this.$("#save-picture").attr("data-disabled", "true");
    this.$(".modal-form-links").append($("<i class=\"fa fa-spinner fa-spin\" id=\"save-progress-tracker\"></i>"));

    var that = this;
    this.model.set("avatar_url", this.pictureUrl);
    this.model.save({}, {
      success: function () {
        $(".picture-form-modal").hide("fade", 500, function () {
          SelFeed.Events.event_bus.trigger("cancelForm", that);
        });
      }
    })
  },

  updatePicture: function (event) {
    event.preventDefault();
    var that = this;
    // Scale selected region to size of actual image
    var scalarSquare = (this.scalarX > this.scalarY) ? this.scalarX : this.scalarY;
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
      width: 100,
      height: 100,
      crop: 'fill'
    });
    $img.css({
      "width": "100px",
      "height": "100px",
      "position": "absolute",
      "top": "50%",
      "left": "50%",
      "transform": "translateX(-50%) translateY(-50%)"
    });
    this.$('.cloudinary-widget').html($img);
    this.$("#crop-picture").css("display", "none")
    this.pictureUrl = $img.attr("src");
    this.$("#save-picture").attr("data-disabled", "false");
  },

  cancelPicture: function (event) {
    event.preventDefault();
    var that = this;
    $(".picture-form-modal").hide("fade", 500, function () {
      SelFeed.Events.event_bus.trigger("cancelForm", that);
    });
  }
})
