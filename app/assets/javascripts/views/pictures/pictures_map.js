SelFeed.Views.PicturesMap = Backbone.CompositeView.extend({
  template: JST["pictures/pictures_map"],

  attributes: {
    class: "map-canvas-container"
  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);

    var that = this;
    var mapOptions = {
      center: { lat: 37.7833, lng: -122.4167},
      zoom: 12
    };

    this._map = new google.maps.Map(this.$(".map-canvas")[0], mapOptions);
    google.maps.event.addListenerOnce(this._map, 'idle', function() {
      google.maps.event.trigger(that._map, 'resize');
    });
  }
});
