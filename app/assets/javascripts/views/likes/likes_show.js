SelFeed.Views.LikeShow = Backbone.View.extend({
  template: JST["likes/like_show"],

  events: {
    "click .picture-likes-button": "toggleLike"
  },

  initialize: function () {
    this.likeCount = this.model.likes.length;
    this.listenTo(this.model.like(), "sync change remove", this.render);
  },

  render: function () {
    var renderedContent = this.template();

    this.$el.html($(renderedContent));
    this.renderLikeButton(this.model);
    this.renderLikeCount(this.likeCount);

    return this;
  },


  toggleLike: function (event) {
    event.preventDefault();
    var currentUserId = $(".current-user-data").data("current-user-id");
    if (this.model.like().isNew()) {
      this.model.like().set("liker_id", currentUserId);
      this.model.like().save();
      this.likeCount++;
    } else {
      this.model.like().destroy();
      this.model.like().set("id", null);
      this.likeCount--;
      this.renderLikeCount(this.likeCount);
    }
  },

  renderLikeButton: function (picture) {
    if (picture.like().isNew()) {
      this.$(".picture-likes-button").removeClass("liked");
    } else {
      this.$(".picture-likes-button").addClass("liked");
    }
  },

  renderLikeCount: function (count) {
    if (count === 0 || count > 1) {
      var countPhrase = count + " likes";
      this.$(".picture-likes-count").html(countPhrase);
    } else {
      this.$(".picture-likes-count").html("1 like");
    }
  }
})
