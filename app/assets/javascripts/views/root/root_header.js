SelFeed.Views.RootHeader = Backbone.CompositeView.extend({
  template: JST["root/root_header"],
  className: "root-header-nav clearfix",
  tagName: "ul",

  events: {
    "click #home-container": "showRoot",
    "click #explore-container": "showPicturesMap",
    "click #add-picture-container": "addPictureForm",
    "click .log-out-link": "destroySession",
    "click .user-link": "showUser",
    "click .edit-user-link": "editUser",
    "click .edit-avatar-link": "addAvatarForm"
  },

  initialize: function (options) {
    this.user_id = options.user_id;
    this.model = new SelFeed.Models.User({ id: this.user_id });
    this.model.fetch();
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(SelFeed.Events.event_bus, "cancelForm", this.removeForm);
  },

  render: function () {
    var renderedContent = this.template({ user: this.model });
    this.$el.html(renderedContent);
    this.attachSubviews();

    return this;
  },

  addPictureForm: function (event) {
    event.preventDefault();
    var pictureForm = new SelFeed.Views.PictureForm();
    this.addSubview(".picture-form-modal-container", pictureForm);
    $("[data-id*=\"step\"]").addClass("shepherd-step-hidden");
    $(".picture-form-modal").show("fade", 500);
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
  },

  editUser: function (event) {
    event.preventDefault();
    window.location = "users/" + this.user_id + "/edit";
  },

  addAvatarForm: function (event) {
    event.preventDefault();
    var avatarForm = new SelFeed.Views.AvatarForm({ model: this.model });
    this.addSubview(".picture-form-modal-container", avatarForm);
    $("[data-id*=\"step\"]").addClass("shepherd-step-hidden");
    $(".picture-form-modal").show("fade", 500);
  },

  removeForm: function (formView) {
    var that = this;
    $(".picture-form-modal").hide("fade", 500, function () {
      that.removeSubview(".picture-form-modal", formView);
      $("[data-id*=\"step\"]").removeClass("shepherd-step-hidden");
    });
  },

  showPicturesMap: function (event) {
    event.preventDefault();
    Backbone.history.navigate("explore", { trigger: true });
  },

  showRoot: function (event) {
    event.preventDefault();
    Backbone.history.navigate("", { trigger: true });
  }
})
