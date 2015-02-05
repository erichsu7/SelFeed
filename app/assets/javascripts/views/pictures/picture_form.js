SelFeed.Views.PictureForm = Backbone.View.extend({
  template: JST["pictures/picture_form"],

  className: "picture-form-modal",

  events: {
    "click #save-picture": "createPicture"
  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);

    return this;
  },

  createPicture: function (event) {
    event.preventDefault();
    var that = this;
    var params = this.$("form").serializeJSON();
    var picture = new SelFeed.Models.Picture(params);
    picture.save({}, {
      success: function () {
        that.collection.add(picture, { merge: true });
        Backbone.history.navigate("", { trigger: true });
      }
    })
  }
})
