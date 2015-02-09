SelFeed.Collections.Pictures = Backbone.Collection.extend({
  model: SelFeed.Models.Picture,
  comparator: function (picture) {
    var date = new Date(picture.get("created_at"));
    return -date.getTime();
  }
})
