SelFeed.Models.Picture = Backbone.Model.extend({
  urlRoot: "api/pictures",

  like: function () {
    this._like = this._like || new SelFeed.Models.Like();
    return this._like;
  },

  parse: function (response) {
    if (response.like) {
      this.like().set(response.like);
      delete response.like;
    } else {
      this.like().set("picture_id", response.id);
    }
    return response;
  }

})
