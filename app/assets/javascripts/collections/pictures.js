SelFeed.Collections.Pictures = Backbone.Collection.extend({
  url: "api/pictures",
  model: SelFeed.Models.Picture,

  comparator: function (picture) {
    var date = new Date(picture.get("created_at"));
    return -date.getTime();
  },

  parse: function (response) {
    if (response.pictures) {
      return response.pictures;
    } else {
      return response
    }
  }
})
