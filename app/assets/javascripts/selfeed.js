window.SelFeed = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new SelFeed.Routers.Router({ $rootEl: $("main")});
    Backbone.history.start();
  }
};

$(document).ready(function(){
  SelFeed.initialize();
});
