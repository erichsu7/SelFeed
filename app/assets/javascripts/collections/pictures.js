SelFeed.Collections.Pictures = Backbone.Collection.extend({
  model: SelFeed.Models.Picture,

  parse: function (response) {
    if (response.author) {
      this.author = response.author;
      delete response.author;
    }
    return response;
  }
})
