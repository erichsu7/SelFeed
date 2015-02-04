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
    var headerView = new SelFeed.Views.RootHeader();
    $(".root-header").html(headerView.render().$el);
  }
})
