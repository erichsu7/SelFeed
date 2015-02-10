SelFeed.Models.Picture = Backbone.Model.extend({
  urlRoot: "api/pictures",

  like: function () {
    this._like = this._like || new SelFeed.Models.Like();
    return this._like;
  },

  comments: function () {
    this._comments = this._comments || new SelFeed.Collections.Comments();
    return this._comments;
  },

  parse: function (response) {
    if (response.like) {
      this.like().set(response.like);
      delete response.like;
    } else {
      this.like().set("picture_id", response.id);
    }

    this.set("likes", response.likes);
    delete response.likes

    this.comments().set(response.comments, { parse: true });
    delete response.comments

    return response;
  }

})
