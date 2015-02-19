SelFeed.Views.PicturesMapTutorial = SelFeed.Views.PicturesFeedTutorial.extend({
  generateTour: function () {
    this.tour = new Shepherd.Tour({
      defaults: {
        classes: "shepherd-theme-arrows",
        scrollTo: true,
        showCancelLink: true
      }
    });
    
    this.tour.addStep({
      title: "Exploring SelFeed",
      text: "Pictures uploaded to SelFeed are geolocated based on the browser location. This map displays recently added pictures by their coordinates.",
      buttons: [
        { text: "Next", action: this.nextAndBookmark.bind(this) }
      ]
    });

    this.tour.addStep({
      title: "Viewing Pictures",
      text: "Zooming in around a marker will display other pictures nearby. Clicking a marker pulls up a picture preview, and clicking that picture takes you to that user's profile page. Bon voyage!",
      buttons: [
        { text: "Back", action: this.backAndBookmark.bind(this) },
        { text: "Hide", action: this.tour.hide }
      ]
    });
  }
});
