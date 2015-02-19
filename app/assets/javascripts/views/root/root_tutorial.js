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

    this.tour.addStep("welcome", {
      title: "Welcome to SelFeed!",
      text: "SelFeed is a social picture sharing platform, allowing users to like and comment on posted content from people they're following. If you've used Instagram before, you'll feel right at home."
    });

    this.tour.addStep("tutorial-instructions", {
      title: "Tutorial Instructions",
      text: "This tutorial will highlight some of the main features of SelFeed. If you ever feel like exploring on your own, simply click the \"Hide Tutorial\" button. You can pick up where you left off by clicking on the ? button.",
      buttons: [
        { text: "Hide tutorial", action: this.pauseTour.bind(this) },
        { text: "Next", action: this.tour.next }
      ]
    })
  }

})
