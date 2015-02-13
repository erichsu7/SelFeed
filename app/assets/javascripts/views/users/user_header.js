SelFeed.Views.UserHeader = Backbone.CompositeView.extend({
  template: JST["users/user_header"],
  className: "user-header-view",

  events: {
    "click #follow-user": "toggleFollow",
    "click #edit-user": "editUser"
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.follow(), "change", this.render);
    setInterval(this.swapPicture.bind(this), 3000);
    this.currentUserId = $(".current-user-data").data("current-user-id");
  },

  render: function () {
    var renderedContent = this.template({ user: this.model, currentUserId: this.currentUserId });
    this.$el.html(renderedContent);
    this.renderFollowButton();
    this.renderCollage();
    this.renderHeaderStats();
    this.followersCount = this.model.escape("followers_count");

    return this;
  },

  toggleFollow: function (event) {
    event.preventDefault();
    if (this.model.follow().isNew()) {
      this.model.follow().save();
      this.followersCount++;
    } else {
      this.model.follow().destroy();
      this.model.follow().set("id", null);
      this.followersCount = this.followersCount - 1;
    }

    this.model.set("followers_count", this.followersCount);
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
    var html = "";
    var that = this;
    this.collagePictures = [];
    if (user.pictures().length > 0) {
      while (this.collagePictures.length < 15) {
        for (var i = 0; i < user.pictures().length; i++) {
        this.collagePictures.push(user.pictures().models[i]);
        }
        i = 0;
      }

      for (i = 0; i < 7; i++) {
        var url = this.collagePictures[i].escape("url");
        var filter = this.collagePictures[i].escape("filter");
        html += "<li id=\"picture-" + i + "\">";
        html += "<a class=\"inner-shadow\"></a>";
        html += "<img class=\"collage-picture\" data-filter=\"" + filter + "\" src=\"" + url + "\">";
        html += "</li>\n";
      }
      that.nextPicIndex = i;
      this.$(".user-header-collage-pictures").html(html);
    }
  },

  swapPicture: function () {
    if (this.model.pictures().length < 2) {
      return;
    }

    var that = this;
    var randomIndex = Math.floor(Math.random() * 7);
    var nextPicUrl = this.collagePictures[this.nextPicIndex].escape("url");
    var $topPicture = this.$("#picture-" + randomIndex + " img");

    while ($topPicture.attr("src") === nextPicUrl) {
      randomIndex = Math.floor(Math.random() * 7);
      var $topPicture = this.$("#picture-" + randomIndex + " img");
    }


    var nextPicFilter = this.collagePictures[this.nextPicIndex].escape("filter");
    var $li = this.$("#picture-" + randomIndex);
    var $bottomPicture = $("<img class=\"collage-picture bottom\" src=\"" + nextPicUrl + "\">");
    $li.append($bottomPicture);
    $bottomPicture.removeClass("bottom", 500, "swing");
    $bottomPicture.attr("data-filter", nextPicFilter);
    $topPicture.addClass("bottom", 500, "swing", function () {
      $topPicture.remove();
    })

    this.nextPicIndex = (this.nextPicIndex + 1) % this.collagePictures.length;
  },

  editUser: function (event) {
    event.preventDefault();
    window.location = "users/" + this.model.id + "/edit";
  },

  renderHeaderStats: function () {
    var headerStats = new SelFeed.Views.UserHeaderStats({
      model: this.model,
      collection: this.model.pictures()
    });
    this.$(".user-header-stats-container").html(headerStats.render().$el);
  }
})
