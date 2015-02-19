SelFeed.Views.RootTutorial = Backbone.View.extend({
  className: "root-tutorial-view",

  events: {
    "click": "startTour"
  },

  initialize: function () {
    this.currentStepId;
    this.generateTour();
  },

  render: function () {
    this.$el.html("<i class=\"fa fa-question\"></i>");

    return this;
  },

  startTour: function (event) {
    if (this.currentStepId) {
      this.tour.show(this.currentStepId);
    } else {
      this.tour.start();
    }
  },

  pauseTour: function (event) {
    this.currentStepId = this.tour.getCurrentStep().id;
    this.tour.hide();
  },

  generateTour: function () {
    this.tour = new Shepherd.Tour({
      defaults: {
        classes: "shepherd-theme-arrows",
        scrollTo: true
      }
    });

    this.tour.addStep({
      title: "Welcome to SelFeed!",
      text: "SelFeed is a social picture sharing platform, allowing users to like and comment on posted content from people they're following. If you've used Instagram before, you'll feel right at home."
    });

    this.tour.addStep({
      title: "Tutorial Instructions",
      text: "This tutorial will highlight some of the main features of SelFeed. If you ever feel like exploring on your own, simply click the \"Hide Tutorial\" button. You can pick up where you left off by clicking on the ? button.",
      buttons: [
        { text: "Hide tutorial", action: this.pauseTour.bind(this) },
        { text: "Next", action: this.tour.next }
      ]
    });

    this.tour.addStep({
      title: "Pictures Feed",
      text: "This is the home page of SelFeed. Pictures posted by you and your followed users will be shown feed-style here.",
      attachTo: "#home-container",
      tetherOptions: { attachment: "bottom left", targetAttachment: "top left"},
      buttons: [
        { text: "Hide tutorial", action: this.pauseTour.bind(this) },
        { text: "Next", action: this.tour.next }
      ]
    });

    this.tour.addStep({
      title: "Infinite Scrolling",
      text: "Scrolling to the bottom of the feed loads more pictures on demand.",
      attachTo: ".root-tutorial-container",
      tetherOptions: {
        attachment: "top right",
        targetAttachment: "bottom right",
        offset: "-65px 100px"
      },
      buttons: [
        { text: "Hide tutorial", action: this.pauseTour.bind(this) },
        { text: "Next", action: this.tour.next }
      ],
      scrollTo: false
    });
  }

})
