SelFeed.Collections.Pictures = Backbone.Collection.extend({
  model: SelFeed.Models.Picture,

  parse: function (response) {
    return response.pictures;
  }
})
