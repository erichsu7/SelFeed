SelFeed.Views.UserHeaderStats = Backbone.View.extend({
  template: JST["users/user_header_stats"],
  className: "user-header-stats-list",

  render: function () {
    var renderedContent = this.template({ user: this.model });
    this.$el.html(renderedContent);

    return this;
  }
})
