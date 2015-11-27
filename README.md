<p align="center">
<img src="https://i.imgur.com/wodL1a6.png" width="75px"/>
</p>
<h1 align=center>Pixel Spot</h1>

Pixel Spot is a crowd sourced photo location scouting app.  Photographers of any skill level can use this app to  search and share their favorite photo locations with others.  Using Flickr's photo hosting and geo-tagging features in conjunction with Google Maps geo-location function users can find the exact spots of amazing photo locations.  Searching for a spot is  made easy with our built in tag fields as well as giving users the ability to create custom tags.  And, of course, users can also search by location.  If you have a photo shoot coming up find your next shot on Pixel Spot!

___

###Installation

- Heroku is used for online deployment for the app
    - run `heroku config:set` **for each environment variable**
    - database is running from MongoLab.  **Connecting the database requires the Heroku add-on for MongoLab.  The add-on is free, but it requires you to enter credit card information to validate the account.**
- MongoLab is used to host the app's database
  - seed data for seeding a mongo database is in seed.js, run with `node seed.js`
  - run this command to import the data:
  
```
mongoimport -h ds012345.mongolab.com:56789 -d dbname -c collectionname -u dbuser -p dbpassword --file filename.json
```
- Flickr API is used for getting geo-location information and hosting images.  **API key for Flickr is required**, check the Flickr API documentation for obtaining a key:
  - [Flickr API](https://www.flickr.com/services/apps/create/apply)
- Google API is used for OAuth and mapping.  **API key for Google is required**, check the Google API documentation for obtaining a key:
  - [Google API](https://developers.google.com/+/web/api/rest/oauth#apikey)
- GeoName API allows the app to search by zipcode.  **An account and API key for GeoName is required**, check the GeoName API documentation for obtaining a key:
  - [GeoNames API](http://www.geonames.org/export/web-services.html)

___

###Technologies Used

Development | APIs | Deployment
------------|------|-------------------
HTML| Google | Heroku
CSS | Flickr | MongoLab
Bootstrap | GeoNames |
JavaScript/jQuery |
Node.js |
Express |
MongoDB |
Git |
GitHub |

___

###API Documentation

Method|Parameters|Description|Required Fields|Optional Fields|
-------------|------|-----------|-------|---|
`index`|`/spots`|a user can see all spots based on a search query
`show`|`/spots/:id`|a user can see a spot in more detail
`create`|`/spots/new`|a user can create a new spot|`title`,  `description`, `flickr_url`, `tags`|`address`
`update`|`/spots/:id`|a user can edit their spot
`search`|`/spots/search/all`|a user can search for spots|`tags`
`upvote`|`/spots/:id/upvote`|a user can upvote a spot
`downvote`|`/spots/:id/downvote`|a user can downvote a spot
`destroy`|`/spots/:id`|a user can delete their spot

#####User Model

Parameters|Value|Description|Example|
----------|-----|-----------|-------|
`name`|String|*captured by Google OAuth API*
`email`|String|*captured by Google OAuth API*
`spots`|[spotSchema]|spots embedded into user|see "Spot Model"
`googleId`|String|*captured by Google OAuth API*

  
#####Spot Model

Parameters|Value|Description|Example|
----------|-----|-----------|-------|
`title`|String|name of spot
`description`|String|description of spot
`flickr_url`|String|Flickr url provided by user
`image_url`|String|*the url returned by our API to embed the image from Flickr to a site*
`lat`|Number|*latitude from Flickr API geo-location*
`lng`|Number|*longitude from Flickr API geo-location*
`address`|String|user supplied street address of spot
`zipcode`|String|*zipcode passed from Flickr API geo-location to GeoNames API*
`rating`|Number|users can upvote or downvote a spot (default 0)
`tags`|[tagSchema]|tags embedded into spot for search functionality|see "Tag Model"
 
#####Tag Model

Parameters|Value|Description|Example|
----------|-----|-----------|-------|
`tag_name`|String|searchable tags
`created`|{ type: Date, default: Date.now }|*date spot was created*

___

[Trello Board](https://trello.com/b/KkLQVJFb/pixel-spot) (Includes data models, wireframes, and our presentation deck)  

___  

###Development Process

<p align="center">
<img src="https://i.imgur.com/z40rtWL.png" width="175px"/>
</p>


The Wayne Enterprises team consists of General Assembly students enrolled in the Web Development Immersive program (also known as WDI-DTLA-6).  The team was selected by the program's instructors and we were given a few days to discuss potential app ideas before the sprint week started.  We decided to make Pixel Spot because we felt it was an app that had immediate real world application and we could meet our project's requirements by:

- Using MongoDB & Express to CRUD data
- Producing a RESTful API that exposes at least one model
- Consuming its own API using AJAX
- Authenticating users using at least one OAuth provider
- Restricting access to the Creation, Updating & Deletion of resource(s) using an authorization middleware function
- Be deployed online using Heroku

After deciding on our idea we began to discuss user stories, the different APIs we could consume, our models, and we started wireframing the general look and mapping of our app's site.  A link to our Trello board is provided above which contains our user stories, wireframes, data models and presentation deck.

We will be using the Flickr API to host images and access those images' geo-location information.  This will allow our users to search for spots by location and it gives us the ability to plug that information into Google's API and display a map for the users to see exactly where a location is.  We are also using Google's API for OAuth.  

Our API lets users create photo "spots" to share with others and allow them to add tags to make their spot easier for others to find.  A user can have one or many spots, and spots can have one or many tags.  A spot consists of a title, image, description, address, rating and tags.  The API also grabs the geo-location information from the image so that information can be displayed on a map and used for searching.  In addition to searching by location users can search by tags which will give users a lot of control over what types of locations they will see based on the type of photoshoot they desire.  

___

###Unsolved Problems/Major Hurdles

- We require a specific url pattern to be able to parse the url for the information we need
- When using geo-location the data doesn't always map exactly back to a specific zipcode.  There's not a one-to-one relationship between lattitude/longitude and zipcodes 
- user input needs to be sanitized
- implement a more robust search feature that matches partial results
