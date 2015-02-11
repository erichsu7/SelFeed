SelFeed.Views.PicturesGridItem = Backbone.View.extend({
  template: JST["pictures/pictures_grid_item"],
  tagName: "li",
  className: "pictures-grid-item-container",

  events: {
    "click img": "triggerShow"
  },

  render: function () {
    var that = this;
    var renderedContent = this.template({ picture: this.model });
    this.$el.html(renderedContent);
    this.addMouseover();
    this.addMouseout();

    return this;
  },

  addMouseover: function () {
    this.$el.on("mouseover", "img", ".grid-item-picture-details" ,function (event) {
      var $div = $(event.delegateTarget).find(".grid-item-picture-details");
      $div.addClass("hover-details");
    });
  },

  addMouseout: function () {
    this.$el.on("mouseout", "img", ".grid-item-picture-details" ,function (event) {
      var $div = $(event.delegateTarget).find(".grid-item-picture-details");
      $div.removeClass("hover-details");
    });
  },

  triggerShow: function (event) {
    event.preventDefault();
    SelFeed.Events.event_bus.trigger("showPictureModal", this.model);
  }
})
