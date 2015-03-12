# SelFeed

SelFeed is a clone of the popular mobile social picture-sharing platform, Instagram, built for the web using Rails and Backbone. Users upload pictures with a custom widget that allows for cropping and filter effects. Pictures can be viewed several ways: in your personal feed of followed users, on a user's profile page, or through the "explore" feature, which displays recent uploads geographically. The app also includes full social functionality, including following users, likes, and commenting.

[Click here to see it live!][sitelink]
[sitelink]: http://www.selfeed.io/

## Technological Highlights

### Overview

SelFeed is built mainly from these technologies:
- [X] Rails
- [X] Backbone
- [X] Ruby
- [X] JavaScript
- [X] jQuery
- [X] HTML
- [X] CSS

### Back-end

User authentication is handled through Rails, and controllers serving JSON responses form an API from which the front-end can create pictures, likes, and comments.

### Front-end

Backbone and jQuery combine to make SelFeed a fast, responsive one-page app. Employing the composite view pattern integrates disparate Backbone views, and a global event bus triggers event handlers across the multiple layers of views. The entire user interface was built from scratch using CSS, HTML, and JavaScript.

### Upload Widget

I knew going into this project this would be the most challenging part of developing SelFeed, but I also had the most fun building it. After experimenting with a few free picture upload widgets, I decided I'd need to craft my own to achieve the level of control and design I wanted. The widget uses the Cloudinary API to load a local image file, then jQuery inserts the preview back on the page. Next, the [jCrop plugin](https://github.com/tapmodo/Jcrop) allows the user to select a square area to upload. Behind the scenes, SelFeed calculates the crop coordinates, then renders that on the page where a filter may be applied before upload.

### Filter Effects

Filter effects are handled with CSS, as described [here](http://designpieces.com/2014/09/instagram-filters-css3-effects/). The filter name is stored in the DB along with the picture URL, so when the image tag is created, the filter name is bootstrapped in and the CSS stylesheet handles the rest.

### Explore Page

The Google Maps API plots recently uploaded pictures according to their coordinates, which are scraped and saved upon upload using `navigator.geolocation.getCurrentPosition`.

### Picture Collage

The picture collage is initially populated with a user's most recent pictures,
then, using 'setInterval', a random picture is swapped out for another random
picture using jQuery DOM manipulation every few seconds.

### Picture Carousel

The carousel was built using Backbone views and the global event bus. Because the carousel is launched from a user's profile page, clicking the left and right arrows on the carousel trigger events back to that view, which transitions to the next picture with jQuery UI transitions. Care is taken so that only one arrow is rendered for the first and last pictures in the collection.

### Infinite Scrolling

PicturesController#index utilizes the Kaminari gem to serve paginated pictures, and the Collection#parse function is overridden to accommodate this. Scrolling to the bottom of the page triggers the fetching of the next page, and upon success these new pictures are added to the feed.

### Tutorial

The Shepherd plugin guides the guest account on a tour of SelFeed's main features.

# Implementation

[See the implementation roadmap here.][implementationlink]
[implementationlink]: ./_final-project-proposal
