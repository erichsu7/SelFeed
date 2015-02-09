SelFeed.Routers.Router = Backbone.Router.extend({
  routes: {
    "": "feedShow",
    "users/:id": "userShow"
  },

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.renderHeader();
  },

  feedShow: function () {
    var that = this;
    var pictures = new SelFeed.Collections.Pictures();
    pictures.fetch({
      url: "api/pictures",
      success: function () {
        var picturesFeed = new SelFeed.Views.PicturesFeed({ collection: pictures });
        that._swapView(picturesFeed);
      }
    });
  },

  userShow: function (id) {
    var user = new SelFeed.Models.User({ id: id });
    user.fetch();
    var showView = new SelFeed.Views.UserShow({ model: user });
    this._swapView(showView);
  },

  renderHeader: function () {
    this.currentUserId= $(".current-user-data").data("current-user-id");
    var headerView = new SelFeed.Views.RootHeader({ user_id: this.currentUserId });
    $(".root-header").html(headerView.render().$el);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
})
