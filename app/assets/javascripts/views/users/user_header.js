SelFeed.Views.UserHeader = Backbone.CompositeView.extend({
  template: JST["users/user_header"],
  className: "user-header-view",

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.follow(), "change", this.render)
  },

  render: function () {
    var renderedContent = this.template({ user: this.model });
    this.$el.html(renderedContent);
    this.renderFollowButton(this.model);

    return this;
  },

  toggleFollow: function () {
  },

  renderFollowButton: function (user) {
    if (user.follow().isNew()) {
      this.$("#follow-user").removeClass("followed");
      this.$("#follow-user").html("Follow")
    } else {
      this.$("#follow-user").addClass("followed");
      this.$("#follow-user").html("Followed");
    }
  },
})
