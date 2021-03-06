SelFeed.Views.PicturesFeed = Backbone.CompositeView.extend({
  template: JST["pictures/pictures_feed"],

  className: "pictures-feed",

  initialize: function (options) {
    var that = this;
    this.tutorialOn = options.tutorialOn;
    this.tutorialOn && this.addTutorial();
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, "add", this.addPicture);
    this.listenTo(this.collection, "remove", this.removePicture);
    this.listenTo(SelFeed.Events.event_bus, "savePicture", this.addPicture);
    this.collection.each( function (picture) {
      that.addPicture(picture);
    });
  },

  render: function (event) {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    this.attachSubviews();
    this.listenForScroll();
    this.tutorialOn && this.addClassesForTutorial();

    return this;
  },

  addPicture: function (picture) {
    var feedItem = new SelFeed.Views.PicturesFeedItem({ model: picture });
    this.prependSubview(".pictures-list", feedItem);
  },

  removePicture: function (picture) {
    var that = this;
    var showView;
    _(this.subviews()).each(function (subviews) {
      showView = _.findWhere(subviews, { model: picture });
      if (showView) {
        that.removeSubview(".pictures-list", showView);
      }
    })
  },

  listenForScroll: function () {
    var that = this;
    $(window).off("scroll");
    var throttledCallback = _.throttle(this.nextPage.bind(this), 200);
    $(window).on("scroll", throttledCallback);
  },

  nextPage: function () {
    var that = this;
    if ($(window).scrollTop() > $(document).height() - $(window).height() - 50) {
      if (this.collection.page_number < this.collection.total_pages) {
        this.collection.fetch({
          data: { page: this.collection.page_number + 1 },
          remove: false
        });
      }
    }
  },

  addTutorial: function () {
    var tutorialView = new SelFeed.Views.PicturesFeedTutorial();
    this.addSubview(".tutorial-container", tutorialView);
  },

  addClassesForTutorial: function () {
    this.$(".pictures-feed-item-container:first-child .picture-details-container")
      .attr("id", "first-details-container");
    this.$(".pictures-feed-item-container:first-child .picture-show-picture")
      .attr("id", "first-picture");
  }
})
