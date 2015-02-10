SelFeed.Views.LikeShow = Backbone.View.extend({
  template: JST["likes/like_show"],
  className: "picture-likes-view",

  events: {
    "click .picture-likes-button": "toggleLike"
  },

  initialize: function (options) {
    this.picture = options.picture;
    this.model = this.picture.like();
    this.likeCount = this.picture.likes().length;
    this.listenTo(this.model, "sync change", this.render);
  },

  render: function () {
    var renderedContent = this.template();

    this.$el.html($(renderedContent));
    this.renderLikeButton(this.picture);
    this.renderLikeCount(this.likeCount);

    return this;
  },


  toggleLike: function (event) {
    event.preventDefault();
    if (this.model.isNew()) {
      this.likeCount++;
      this.model.save();
    } else {
      this.likeCount--;
      this.model.destroy();
      this.model.set("id", null);
    }
  },

  renderLikeButton: function () {
    if (this.model.isNew()) {
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
