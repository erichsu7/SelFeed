SelFeed.Routers.Router = Backbone.Router.extend({
  routes: {
    "users/:id": "userShow"
  },

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.renderHeader();
  },

  userShow: function (id) {
    var userPictures = new SelFeed.Collections.Pictures();
    var url = "api/users/" + id;
    userPictures.fetch({ url: url });
    var showView = new SelFeed.Views.PicturesFeed({ collection: userPictures });
    this._swapView(showView);
  },

  renderHeader: function () {
    var currentUserUsername= $(".current-user-data").data("current-user-username");
    var headerView = new SelFeed.Views.RootHeader({ username: currentUserUsername });
    $(".root-header").html(headerView.render().$el);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
})
