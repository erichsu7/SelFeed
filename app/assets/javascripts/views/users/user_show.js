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

  showPictureModal: function (picture, time) {
    var showView = new SelFeed.Views.PictureShow({
      model: picture,
      collection: this.model.pictures()
    })
    time = time ? time : 500;
    this.addSubview(".picture-show-modal", showView);
    $(".picture-show-modal").show("fade", time);
    this.resizeCommentsFeed();
  },

  closePictureModal: function (subview, time,  callback) {
    var that = this;
    time = time ? time : 500;
    $(".picture-show-modal").hide("fade", time, function () {
      that.removeSubview(".picture-show-modal", subview);
      if (callback) {
        callback();
      };
    })
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

    this.closePictureModal(options.view, 250, this.showPictureModal.bind(this, nextPicture, 250));
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
