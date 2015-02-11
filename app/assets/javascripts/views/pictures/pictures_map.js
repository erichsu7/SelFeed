SelFeed.Views.PicturesMap = Backbone.CompositeView.extend({

  attributes: {
    id: "map-canvas"
  },

  render: function () {
    var that = this;
    var mapOptions = {
      center: { lat: 37.7833, lng: -122.4167},
      zoom: 12
    };

    this._map = new google.maps.Map(this.el, mapOptions);
    google.maps.event.addListenerOnce(this._map, 'idle', function() {
      google.maps.event.trigger(that._map, 'resize');
    });
  }
});
