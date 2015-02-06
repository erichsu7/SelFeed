SelFeed.Views.PictureShow = Backbone.CompositeView.extend({
  template: JST["pictures/picture_show"],
  tagName: "li",
  className: "picture-show-container",

  events: {
    "click .picture-likes-button": "toggleLike"
  },


  render: function () {
    var renderedContent = this.template({ picture: this.model });
    this.$el.html(renderedContent);
    this.renderLiked(this.model);
    this.renderLikeCount(this.model.likes.length);

    return this;
  },

  toggleLike: function (event) {
    event.preventDefault();
    var currentUserId = $(".current-user-data").data("current-user-id");

    if (this.model.like().isNew()) {
      this.$(".picture-likes-button").addClass("liked");
      this.model.like().set("liker_id", currentUserId);
      this.model.like().save();
      debugger;
      this.model.likes.push(this.model.like());
      this.renderLikeCount(this.model.likes.length);
    } else {
      this.$(".picture-likes-button").removeClass("liked");
      this.model.like().destroy();
      this.model.like().set("id", null);
      this.renderLikeCount(this.model.likes.length);
    }
  },

  renderLiked: function (picture) {
    if (picture.like().isNew()) {
      this.$(".picture-likes-button").removeClass("liked");
    } else {
      this.$(".picture-likes-button").addClass("liked");
    }
  },

  renderLikeCount: function (count) {
    console.log(count);
    if (count === 0 || count > 1) {
      var countPhrase = count + " likes";
      this.$(".picture-likes-count").html(countPhrase);
    } else {
      this.$(".picture-likes-count").html("1 like");
    }
  }
})
