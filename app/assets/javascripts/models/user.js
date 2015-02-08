SelFeed.Models.User = Backbone.Model.extend({
  urlRoot: "api/users",

  follow: function () {
    this._follow = this._follow || new SelFeed.Models.Follow();
    return this._follow;
  },

  pictures: function () {
    this._pictures = this._pictures || new SelFeed.Collections.Pictures();
    return this._pictures;
  },

  parse: function (response) {
    if (response.follow) {
      this.follow().set(response.follow, { parse: true });
      delete response.follow;
    }

    if (response.authored_pictures) {
      this.pictures().set(response.authored_pictures, { parse: true });
      delete response.pictures;
    }
    return response;
  }
});
