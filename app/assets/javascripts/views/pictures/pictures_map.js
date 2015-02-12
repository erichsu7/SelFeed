SelFeed.Views.PicturesMap = Backbone.CompositeView.extend({
  template: JST["pictures/pictures_map"],

  attributes: {
    class: "map-canvas-container"
  },

  initialize: function () {
    this._markers = {};
    this.listenTo(this.collection, "add", this.addMarker);
    this.listenTo(this.collection, "remove", this.removeMarker);
  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);

    var that = this;
    var mapOptions = {
      center: { lat: 37.7833, lng: -122.4167},
      zoom: 12
    };

    this.collection.each(function (picture) {
      that.addMarker(picture);
    });

    this._map = new google.maps.Map(this.$(".map-canvas")[0], mapOptions);
    google.maps.event.addListenerOnce(this._map, 'idle', function() {
      google.maps.event.trigger(that._map, 'resize');
    });
  },

  addMarker: function (picture) {
    if (this._markers[picture.id]) {
      return;
    }
    var that = this;
    var latLng = new google.maps.LatLng(
      picture.get("latitude"),
      picture.get("longitude")
    );

    var marker = new google.maps.Marker({
      position: latLng,
      map: this._map,
      author_id: picture.escape("author_id"),
      author_username: picture.escape("author_username"),
      picture_url: picture.escape("url"),
      picture_created_at: picture.escape("created_at"),
      picture_filter: picture.escape("filter")
    });

    google.maps.event.addListener(marker, "click", function (event) {
      that.showPicturePreview(event, marker);
    })

    this._markers[picture.id] = marker;
  },

  removeMarker: function (picture) {
    var marker = this._markers[picture.id];
    marker.setMap(null);
    delete this._marker[picture.id];
  },

  showPicturePreview: function (event, marker) {
    var userUrl = "#/users/" + marker.author_id;
    var imgTag = "<img height=\"100\" width=\"100\" data-filter=\"" + marker.picture_filter + "\"src=\"" + marker.picture_url + "\">";
    var aTag = "<a href=\"" + userUrl + "\">" + imgTag + "</a>";
    var createdAt = moment(marker.picture_created_at).fromNow();
    var infoWindow = new google.maps.InfoWindow({
      content: marker.author_username + "<br>" + aTag + "<br>" + createdAt
    });

    infoWindow.open(this._map, marker);
  }
});
