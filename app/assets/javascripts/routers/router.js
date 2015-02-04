SelFeed.Routers.Router = Backbone.Router.extend({
  routes: {
    "": "userShow"
  },

  initialize: function (options) {
    this.$rootEl = options.$rootEl;

    this.renderHeader();
  },

  userShow: function () {

  },

  renderHeader: function () {
    var currentUserUsername= $(".current-user-data").data("current-user-username");
    var headerView = new SelFeed.Views.RootHeader({ username: currentUserUsername });
    $(".root-header").html(headerView.render().$el);
  }
})
