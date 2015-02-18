SelFeed.Collections.Pictures = Backbone.Collection.extend({
  url: "api/pictures",
  model: SelFeed.Models.Picture,

  comparator: function (picture) {
    var date = new Date(picture.get("created_at"));
    return -date.getTime();
  },

  parse: function (response) {
    if (response.pictures) {
      this.page_number = parseInt(response.page_number);
      this.total_pages = parseInt(response.total_pages);
      return response.pictures;
    } else {
      return response
    }
  }
})
