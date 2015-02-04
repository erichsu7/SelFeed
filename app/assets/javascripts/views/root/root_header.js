SelFeed.Views.RootHeader = Backbone.View.extend({
  template: JST["root/root_header"],
  className: "root-header-nav clearfix",

  events: {
    "click .add-picture-link": "showPictureForm",
    "click .log-out-link": "destroySession"
  },

  initialize: function (options) {
    this.username = options.username;
  },

  render: function () {
    var renderedContent = this.template({ username: this.username });
    this.$el.html(renderedContent);

    return this;
  },

  showPictureForm: function () {
    var pictureForm = new SelFeed.Views.PictureForm();
    $("#main").append(pictureForm.render().$el);
  },

  destroySession: function () {
    $.ajax("/session", {
      type: "DELETE",
      success: function (response) {
        window.location = "";
      }
    })
  }
})
