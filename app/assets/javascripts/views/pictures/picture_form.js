SelFeed.Views.PictureForm = Backbone.CompositeView.extend({
  template: JST["pictures/picture_form"],

  events: {
    "click #save-picture": "createPicture",
    "click #crop-picture": "updatePicture",
    "click #cancel-picture": "triggerCancel"
  },

  initialize: function () {
    this.listenTo(SelFeed.Events.event_bus, "filterApply", this.applyFilter);
    navigator.geolocation.getCurrentPosition(this.storeCoords.bind(this));
  },

  storeCoords: function (position) {
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;
  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    this.activateCloudinary();

    return this;
  },

  activateCloudinary: function () {
    var that = this;
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

  createPicture: function (event) {
    event.preventDefault();

    var $target = $(event.target);
    if ($target.attr("data-disabled") === "true") {
      return;
    }

    this.$("#save-picture").attr("data-disabled", "true");
    this.$(".modal-form-links").append($("<i class=\"fa fa-spinner fa-spin\" id=\"save-progress-tracker\"></i>"));
    var that = this;
    var params = this.$("form").serializeJSON();
    
    params.picture.url = this.pictureUrl;
    params.picture.filter = this.currentFilter;
    params.picture.latitude = this.latitude;
    params.picture.longitude = this.longitude;
    var picture = new SelFeed.Models.Picture(params.picture);
    picture.save({}, {
      success: function (model, response) {
        SelFeed.Events.event_bus.trigger("savePicture", picture);
        $(".picture-form-modal").hide("fade", 500, function () {
          SelFeed.Events.event_bus.trigger("cancelForm", that);
        });
      }
    });
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
      width: 500,
      height: 500,
      crop: 'fill'
    });
    $img.css({
      "width": "400px",
      "height": "400px"
    });
    this.currentFilter = "none",
    $img.data("filter", this.currentFilter);
    this.$('.cloudinary-widget').html($img);
    this.$("#crop-picture").css("display", "none")
    this.pictureUrl = $img.attr("src");
    this.addPictureFilterPalette();
    this.$("#save-picture").attr("data-disabled", "false");
  },

  triggerCancel: function (event) {
    event.preventDefault();
    SelFeed.Events.event_bus.trigger("cancelForm", this);
  },

  addPictureFilterPalette: function () {
    var pictureFilterPalette = new SelFeed.Views.PictureFilterPalette();
    this.addSubview(".picture-filter-palette-container", pictureFilterPalette);
    this.$(".picture-filter-palette-container").css("display", "block");
  },

  applyFilter: function (event) {
    var $target = $(event.target);
    var filter = $target.data("filter");
    this.$(".cloudinary-widget > img").attr("data-filter", filter);
    this.currentFilter = filter;
  }
})
