SelFeed.Views.UserShow = Backbone.CompositeView.extend({
  template: JST["users/user_show"],
  className: "user-show-view",

  initialize: function (options) {
    this.tutorialOn = options.tutorialOn;
    this.listenTo(SelFeed.Events.event_bus, "showPictureModal", this.showPictureModal);
    this.listenTo(SelFeed.Events.event_bus, "closePictureModal", this.closePictureModal);
    this.listenTo(SelFeed.Events.event_bus, "switchPictureModal", this.switchPictureModal);
  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    this.addUserHeader();
    this.addPicturesGrid();
    this.tutorialOn && this.addTutorial();
    this.attachSubviews();

    return this;
  },

  addUserHeader: function () {
    var userHeader = new SelFeed.Views.UserHeader({
      model: this.model
    });
    this.addSubview(".user-header-container", userHeader);
  },

  addPicturesGrid: function () {
    var picturesGrid = new SelFeed.Views.PicturesGrid({
      collection: this.model.pictures()
    });
    this.addSubview(".pictures-grid-container", picturesGrid);
  },

  showPictureModal: function (picture) {
    var showView = new SelFeed.Views.PictureShow({
      model: picture,
      collection: this.model.pictures()
    })
    this.addSubview(".picture-show-modal", showView);
    $("[data-id*=\"step\"]").addClass("shepherd-step-hidden");
    $(".picture-show-modal").show();
    this.resizeCommentsFeed();
  },

  closePictureModal: function (subview, callback) {
    var that = this;
    $("[data-id*=\"step\"]").removeClass("shepherd-step-hidden");
    $(".picture-show-modal").hide();
    that.removeSubview(".picture-show-modal", subview);
    callback && callback();
  },

  switchPictureModal: function (options) {
    var that = this;
    var currentPictureIndex = this.model.pictures().indexOf(options.picture);
    var nextPicture = (function () {
      if (options.direction === "right") {
        return that.model.pictures().at(currentPictureIndex + 1);
      } else {
        return that.model.pictures().at(currentPictureIndex - 1);
      }
    })();

    this.closePictureModal(options.view, this.showPictureModal.bind(this, nextPicture));
  },

  resizeCommentsFeed: function () {
    var otherHeight =
      this.$(".picture-show-details-container").height() +
      this.$(".picture-show-likes-container").height() +
      this.$(".picture-show-comments-container .picture-comments-form-container").height();
    this.$(".picture-show-comments-container").height(500 - otherHeight);
    var maxHeightString = (500 - otherHeight) + "px";
    this.$(".picture-show-comments-container").css({
      "max-height": maxHeightString
    });
  },

  addTutorial: function () {
    var tutorialView = new SelFeed.Views.UserShowTutorial();
    this.addSubview(".tutorial-container", tutorialView);
  }

});
