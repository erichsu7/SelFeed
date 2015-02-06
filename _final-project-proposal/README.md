# SelFeed

## Minimum Viable Product
SelFeed is clone of Instagram built on Rails and Backbone
Users can:

- [x] Create accounts
- [x] Create sessions (log in)
- [x] Upload pictures
- [x] Caption pictures
- [] Like pictures
- [] Comment on pictures
- [x] View own profile page
- [x] View other users' pages
- [] Follow users
- [] View a feed of followed users' pictures

## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, Rails user profile page (~1 day)
User authentication will be implemented server-side using lessons from the Rails curriculum. I will need to set up the DB and Rails models to handle account creation and sign in. Also, I'll create basic Rails views for these forms and the user profile page. The user show page will be used for both viewing one's own and other users.

[Details][phase-one]

### Phase 2: Photo upload (~2 days)
This will probably be the most difficult part of my project. I'll use Cloudinary for picture upload and editing, because it handles both of these at once. In this phase, I'll need to add a Backbone view for editing and uploading a photo and create migrations for the database to handle photos with their captions. I'll include this as a modal.

[Details][phase-two]

### Phase 3: User show page with uploaded pictures (~1 day)
I will add API routes to serve user and picture as JSON, then add Backbone models and collections that fetch data from those routes. I'll update the user profile page to display all of his uploaded photos using Backbone. I'd like to implement infinite scrolling for this.

[Details][phase-three]

### Phase 4: Liking and commenting photos (~1 day)
I'll need to add some join tables to link photos with likes and comments. On the photo view, I'll add a button to like and a form to add a comment. The likes and comments will appear instantly.

[Details][phase-four]

### Phase 5: User feed (~2 days)
First, I'll need to add the ability to follow another user. Using the association of followed users, pictures will be pulled from the DB and sorted into a Backbone collection. This collection will be used to populate the feed view with picture views.

[Details][phase-five]

### Bonus Features (TBD)
If I have time, I'd like to implement hashtagging photos and implementing search functionality based on those hashtags. Also, I think a user avatar and profile cover photo would be nice touches. Other possible features are listed below.

- [] Profile feed vs grid view
- [] Feed infinite scrolling
- [] Picture filter on upload
- [] Hashtag pictures
- [] Search pictures by hashtag
- [] Show most popular pictures
- [] Geographic display of pictures
- [] Activity history for pictures (e.g. likes, comments, tags)
- [] Activity history for followed users
- [] User avatars
- [] Profile page cover photo
- [] Video upload
- [] Explore all pictures

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
