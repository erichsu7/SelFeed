SelFeed.Views.RootHeader = Backbone.View.extend({
  template: JST["root_header"],
  className: "root-header-nav clearfix",

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);

    return this;
  }
})
