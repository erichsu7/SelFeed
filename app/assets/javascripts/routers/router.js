SelFeed.Routers.Router = Backbone.Router.extend({
  routes: {
    "": "feedShow",
    "users/:id": "userShow",
    "explore": "mapShow"
  },

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.renderHeader();
  },

  feedShow: function () {
    var that = this;
    var pictures = new SelFeed.Collections.Pictures();
    pictures.fetch({
      data: { page: 1 },
      url: "api/pictures",
      success: function () {
        var picturesFeed = new SelFeed.Views.PicturesFeed({
          collection: pictures,
          tutorialOn: that.tutorialOn
        });
        that._swapView(picturesFeed);
      }
    });
  },

  userShow: function (id) {
    var user = new SelFeed.Models.User({ id: id });
    user.fetch();
    var showView = new SelFeed.Views.UserShow({
      model: user,
      tutorialOn: this.tutorialOn
    });
    this._swapView(showView);
  },

  renderHeader: function () {
    this.currentUserId = $(".current-user-data").data("current-user-id");
    this.tutorialOn = $(".current-user-data").data("tutorial-on");
    this.tutorialOn && this._toggleTutorialAuto();
    var headerView = new SelFeed.Views.RootHeader({ user_id: this.currentUserId });
    $(".root-header").html(headerView.render().$el);
  },

  mapShow: function () {
    var pictures = new SelFeed.Collections.Pictures();
    var picturesMap = new SelFeed.Views.PicturesMap({
      collection: pictures,
      tutorialOn: this.tutorialOn
    });
    this._swapView(picturesMap);

    pictures.fetch({
      data: { all_pictures: true }
    });
  },

  _swapView: function (view) {
    var that = this;
    this.tutorialOn && SelFeed.Events.event_bus.trigger("closeTutorial");
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.$el);
    view.render();
    view.$el.show("fade", 1000, function () {
      that.tutorialAuto && SelFeed.Events.event_bus.trigger("triggerTutorial", that.tutorialAuto );
    });
  },

  _toggleTutorialAuto: function () {
    if (this.tutorialOn) {
      this.tutorialAuto = this.tutorialOn;
      this.listenTo(SelFeed.Events.event_bus, "toggleTutorialAuto", function (boolean) {
        this.tutorialAuto = boolean;
      });
    }
  }

})
