SelFeed.Views.PicturesFeedTutorial = Backbone.View.extend({
  className: "pictures-feed-tutorial-view",

  events: {
    "click": "startTour"
  },

  initialize: function () {
    this.currentStepId;
    this.initializeTour();
    this.generateTour();
    this.listenTo(SelFeed.Events.event_bus, "triggerTutorial", this.startTour);
    this.listenTo(SelFeed.Events.event_bus, "closeTutorial", this.tour.hide);
  },

  render: function () {
    this.$el.html("<i class=\"fa fa-question\"></i>");

    return this;
  },

  startTour: function (event) {
    if (event.type === "click") {
      SelFeed.Events.event_bus.trigger("toggleTutorialAuto", true);
    }
    if (this.currentStepId) {
      this.tour.show(this.currentStepId);
    } else {
      this.tour.start();
    }
  },

  backAndBookmark: function () {
    this.tour.back();
    this.currentStepId = this.tour.getCurrentStep().id;
  },

  nextAndBookmark: function () {
    this.tour.next();
    this.currentStepId = this.tour.getCurrentStep().id;
  },

  initializeTour: function () {
    this.tour = new Shepherd.Tour({
      defaults: {
        classes: "shepherd-theme-arrows",
        scrollTo: true,
        showCancelLink: true
      }
    });

    this.listenTo(this.tour, "cancel", function () {
      SelFeed.Events.event_bus.trigger("toggleTutorialAuto", false);
    });
  },

  generateTour: function () {
    this.tour.addStep({
      title: "Welcome to SelFeed!",
      text: "SelFeed is a social picture sharing platform, allowing users to like and comment on posted content from people they're following. If you've used Instagram before, you'll feel right at home.",
      buttons: [
        { text: "Next", action: this.nextAndBookmark.bind(this) }
      ]
    });

    this.tour.addStep({
      title: "Tutorial Instructions",
      text: "This tutorial will highlight some of the main features of SelFeed. If you ever feel like exploring on your own, simply click <i class=\"fa fa-times\"></i>. You can resume by clicking on the <i class=\"fa fa-question\"></i> button in the lower right corner.",
      buttons: [
        { text: "Back", action: this.backAndBookmark.bind(this) },
        { text: "Next", action: this.nextAndBookmark.bind(this) }
      ]
    });

    this.tour.addStep({
      title: "Pictures Feed",
      text: "This is the home page of SelFeed. Pictures posted by you and your followed users will be shown feed-style here.",
      attachTo: "#home-container",
      tetherOptions: {
        attachment: "bottom left",
        targetAttachment: "top left"
      },
      buttons: [
        { text: "Back", action: this.backAndBookmark.bind(this) },
        { text: "Next", action: this.nextAndBookmark.bind(this) }
      ]
    });

    this.tour.addStep({
      title: "Likes and Comments",
      text: "Click the <i class=\"fa fa-heart\"></i> to like the picture. Enter a comment and see your comment show up in the feed.",
      attachTo: "#first-picture",
      tetherOptions: {
        attachment: "bottom left",
        targetAttachment: "bottom right"
        },
      buttons: [
        { text: "Back", action: this.backAndBookmark.bind(this) },
        { text: "Next", action: this.nextAndBookmark.bind(this) }
      ]
    });

    this.tour.addStep({
      title: "Infinite Scrolling",
      text: "Scrolling to the bottom of the feed loads more pictures on demand.",
      tetherOptions: {
        target: document.body,
        attachment: 'bottom right',
        targetModifier: 'scroll-handle'
      },
      buttons: [
        { text: "Back", action: this.backAndBookmark.bind(this) },
        { text: "Next", action: this.nextAndBookmark.bind(this) }
      ]
    });

    this.tour.addStep({
      title: "Picture Upload",
      text: "SelFeed allows users to edit and share their local pictures. Go ahead and try uploading a picture of your own (don't worry, it will be removed when you log out). Make sure to check out the filters!",
      attachTo: "#add-picture-container",
      tetherOptions: {
        attachment: "bottom left",
        targetAttachment: "top left",
      },
      buttons: [
        { text: "Back", action: this.backAndBookmark.bind(this) },
        { text: "Next", action: this.nextAndBookmark.bind(this) }
      ]
    });

    this.tour.addStep({
      title: "Either Go to User Profile...",
      text: "You may click on the username to navigate to the user's profile page. You will be able to see the user's picture collection in more detail. Or...",
      attachTo: "#first-details-container",
      tetherOptions: {
        attachment: "top left",
        targetAttachment: "bottom middle"
      },
      buttons: [
        { text: "Back", action: this.backAndBookmark.bind(this) },
        { text: "Next", action: this.nextAndBookmark.bind(this) }
      ]
    });

    this.tour.addStep({
      title: "...Or Go to Your Profile",
      text: "You can also try browsing to your own profile page by hovering over your avatar and choosing \"View Profile \" from the dropdown.",
      attachTo: ".user-container",
      tetherOptions: {
        attachment: "top right",
        targetAttachment: "top left"
      },
      buttons: [
        { text: "Back", action: this.backAndBookmark.bind(this) },
        { text: "Hide", action: this.tour.hide }
      ]
    });
  }

})
