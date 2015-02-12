SelFeed.Views.UserShow = Backbone.CompositeView.extend({
  template: JST["users/user_show"],
  className: "user-show-view",

  initialize: function () {
    this.addUserHeader();
    this.addPicturesGrid();
    this.listenTo(SelFeed.Events.event_bus, "showPictureModal", this.showPictureModal);
    this.listenTo(SelFeed.Events.event_bus, "closePictureModal", this.closePictureModal);
  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
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
      model: picture
    })
    this.addSubview(".picture-show-modal", showView);
    $(".picture-show-modal").show("fade", 500);
    this.resizeCommentsFeed();
  },

  closePictureModal: function (subview) {
    this.removeSubview(".picture-show-modal", subview);
  },

  resizeCommentsFeed: function () {
    var otherHeight =
      this.$(".picture-show-details-container").height() +
      this.$(".picture-show-likes-container").height() +
      this.$(".picture-show-comments-container .picture-comments-form-container").height();
    this.$(".picture-show-comments-container").height(500 - otherHeight);
    var maxHeightString = (500 - otherHeight) + "px";
    this.$(".picture-show-comments-container").css("max-height", maxHeightString);
  }

});
