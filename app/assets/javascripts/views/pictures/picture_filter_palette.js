SelFeed.Views.PictureFilterPalette = Backbone.View.extend({
  template: JST["pictures/picture_filter_palette"],

  className: "picture-filter-palette-view",

  events: {
    "click li": "triggerEvent"
  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);

    return this;
  },

  triggerEvent: function (event) {
    SelFeed.Events.event_bus.trigger("filterApply", event);
  }
})
