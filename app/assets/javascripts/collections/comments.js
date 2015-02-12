SelFeed.Collections.Comments = Backbone.Collection.extend({
  model: SelFeed.Models.Comment,
  comparator: function (comment) {
    return -comment.id;
  }
})
