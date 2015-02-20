SelFeed.Views.PicturesMap = Backbone.CompositeView.extend({
  template: JST["pictures/pictures_map"],

  attributes: {
    class: "map-canvas-container"
  },

  initialize: function () {
    this._markers = {};
    this.listenTo(this.collection, "add", this.addMarker);
    this.listenTo(this.collection, "remove", this.removeMarker);
    this.listenTo(SelFeed.Events.event_bus, "savePicture", this.addMarker);
  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    this.addTutorial();
    this.attachSubviews();

    var that = this;
    var mapOptions = {
      // center: { lat: 37.7833, lng: -122.4167},
      center: {lat: 0, lng: 0 },
      zoom: 2
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
    this.infoWindow && this.infoWindow.close();
    var userUrl = "#/users/" + marker.author_id;
    var imgTag = "<img height=\"200\" width=\"200\" data-filter=\"" + marker.picture_filter + "\"src=\"" + marker.picture_url + "\">";
    var aTag = "<a href=\"" + userUrl + "\">" + imgTag + "</a>";
    var createdAt = moment(marker.picture_created_at).fromNow();
    this.infoWindow = new google.maps.InfoWindow({
      content: marker.author_username + "<br>" + aTag + "<br>" + createdAt
    });

    this.infoWindow.open(this._map, marker);
  },

  addTutorial: function () {
    var tutorialView = new SelFeed.Views.PicturesMapTutorial();
    this.addSubview(".tutorial-container", tutorialView);
  }
});
