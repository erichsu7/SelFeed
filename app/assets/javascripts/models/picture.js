SelFeed.Models.Picture = Backbone.Model.extend({
  urlRoot: "api/pictures",

  like: function () {
    this._like = this._like || new SelFeed.Models.Like();
    return this._like;
  },

  likes: function () {
    this._likes = this._likes || new SelFeed.Collections.Likes();
    return this._likes;
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

    if (response.likes) {
      this.likes().set(response.likes);
      delete response.likes
    }

    if (response.comments) {
      this.comments().set(response.comments, { parse: true });
      delete response.comments
    }


    return response;
  }

})
