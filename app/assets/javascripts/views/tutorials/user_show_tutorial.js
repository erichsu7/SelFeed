SelFeed.Views.UserShowTutorial = SelFeed.Views.PicturesFeedTutorial.extend({

  generateTour: function () {
    this.tour = new Shepherd.Tour({
      defaults: {
        classes: "shepherd-theme-arrows",
        scrollTo: true,
        showCancelLink: true
      }
    });

    this.tour.addStep({
      title: "User Profile Page",
      text: "The profile page gives a more detailed look at a user.",
      buttons: [
        { text: "Next", action: this.nextAndBookmark.bind(this) }
      ]
    });

    this.tour.addStep({
      title: "Picture Collage",
      text: "The user's most recent uploaded pictures are displayed here. Wait a few seconds for some jQuery magic!",
      attachTo: ".user-header-collage-pictures",
      tetherOptions: {
        attachment: "top left",
        targetAttachment: "bottom middle",
        offset: "80px 0"
      },
      buttons: [
        { text: "Back", action: this.backAndBookmark.bind(this) },
        { text: "Next", action: this.nextAndBookmark.bind(this) }
      ]
    });

    this.tour.addStep({
      title: "User Details",
      text: "You can toggle your following of this user or edit your profile if it's your page. Check out the stats box over to the right.",
      attachTo: ".user-header-details",
      tetherOptions: {
        attachment: "bottom left",
        targetAttachment: "top middle",
        offset: "0 300px"
      },
      scrollTo: false,
      buttons: [
        { text: "Back", action: this.backAndBookmark.bind(this) },
        { text: "Next", action: this.nextAndBookmark.bind(this) }
      ]
    });

    this.tour.addStep({
      title: "Picture Previews",
      text: "This area shows all of a user's uploaded pictures. Hovering over each picture shows its details. Clicking a picture opens an expanded picture view and carousel to browse all the pictures.",
      attachTo: ".pictures-grid-view",
      tetherOptions: {
        attachment: "top left",
        targetAttachment: "bottom left",
        offset: "-20px -20px"
      },
      scrollTo: false,
      buttons: [
        { text: "Back", action: this.backAndBookmark.bind(this) },
        { text: "Next", action: this.nextAndBookmark.bind(this) }
      ]
    });

    this.tour.addStep({
      title: "Go Explore!",
      text: "Once you've finished checking out this user, click the <i class=\"fa fa-globe\"></i> to explore pictures from around the world!",
      attachTo: "#explore-container",
      tetherOptions: {
        attachment: "bottom left",
        targetAttachment: "top left",
      },
      buttons: [
        { text: "Back", action: this.backAndBookmark.bind(this) },
        { text: "Hide", action: this.tour.hide }
      ]
    });
  }
});
