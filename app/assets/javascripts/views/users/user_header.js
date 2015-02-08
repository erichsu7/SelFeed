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
})
