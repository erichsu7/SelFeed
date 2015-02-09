SelFeed.Views.UserHeader = Backbone.CompositeView.extend({
  template: JST["users/user_header"],
  className: "user-header-view",

  events: {
    "click #follow-user": "toggleFollow"
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.follow(), "change", this.render);
  },

  render: function () {
    var renderedContent = this.template({ user: this.model });
    this.$el.html(renderedContent);
    this.renderFollowButton();
    this.renderCollage();

    return this;
  },

  toggleFollow: function (event) {
    event.preventDefault();

    if (this.model.follow().isNew()) {
      this.model.follow().save();
    } else {
      this.model.follow().destroy();
      this.model.follow().set("id", null);
    }
  },

  renderFollowButton: function () {
    if (this.model.follow().isNew()) {
      this.$("#follow-user").removeClass("followed");
      this.$("#follow-user").html("Follow")
    } else {
      this.$("#follow-user").addClass("followed");
      this.$("#follow-user").html("Followed");
    }
  },

  renderCollage: function () {
    var user = this.model;
    var collagePictures = [];
    if (user.pictures().length > 0) {
      while (collagePictures.length < 7) {
        for (var i = 0; i < user.pictures().length; i++) {
        collagePictures.push(user.pictures().models[i]);
        }
        i = 0;
      }
    }

    var html = "";
    for (i = 0; i < collagePictures.length - 1; i++) {
      var url = collagePictures[i].escape("url");
      html += "<img class=\"collage-picture\" id=\"picture-" + i + "\" src=\"" + url + "\">\n";
    }
    this.$(".user-header-collage-pictures").html(html);
  }
})
