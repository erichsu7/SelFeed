SelFeed.Views.RootHeader = Backbone.CompositeView.extend({
  template: JST["root/root_header"],
  className: "root-header-nav clearfix",

  events: {
    "click .add-picture-link": "addPictureForm",
    "click .log-out-link": "destroySession",
    "click .user-link": "showUser"
  },

  initialize: function (options) {
    this.user_id = options.user_id;
    this.username = options.username;
  },

  render: function () {
    var renderedContent = this.template({ username: this.username });
    this.$el.html(renderedContent);

    return this;
  },

  addPictureForm: function (event) {
    event.preventDefault();
    var pictureForm = new SelFeed.Views.PictureForm();
    this.addSubview(".picture-form-modal", pictureForm);
  },

  destroySession: function () {
    $.ajax("/session", {
      type: "DELETE",
      success: function (response) {
        window.location = "";
      }
    })
  },

  showUser: function (event) {
    event.preventDefault();
    var url = "/users/" + this.user_id;
    Backbone.history.navigate(url, { trigger: true });
  }
})
