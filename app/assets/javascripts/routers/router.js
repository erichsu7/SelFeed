SelFeed.Routers.Router = Backbone.Router.extend({
  routes: {
    "users/:id": "userShow"
  },

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.renderHeader();
  },

  userShow: function (id) {
    var user = new SelFeed.Models.User({ id: id });
    user.fetch();
    var showView = new SelFeed.Views.UserShow({ model: user });
    this._swapView(showView);
  },

  renderHeader: function () {
    this.currentUserId= $(".current-user-data").data("current-user-id");
    this.currentUserUsername= $(".current-user-data").data("current-user-username");
    var headerView = new SelFeed.Views.RootHeader({ user_id: this.currentUserId, username: this.currentUserUsername });
    $(".root-header").html(headerView.render().$el);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
})
