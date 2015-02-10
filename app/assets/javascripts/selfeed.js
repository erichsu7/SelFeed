window.SelFeed = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Events: {},
  initialize: function() {
    new SelFeed.Routers.Router({ $rootEl: $("#main")});
    Backbone.history.start();
  }
};

$(document).ready(function(){
  SelFeed.initialize();
});
