->![Pixel Spot](https://i.imgur.com/wodL1a6.png =75x)<-

<h1 style="text-align:center;">Pixel Spot</h1>

Pixel Spot is a crowd sourced photo location scouting app.  Photographers of any skill level can use this app to  search and share their favorite photo locations with others.  Using Flickr's photo hosting and geo-tagging features in conjunction with Google Maps geo-location function users can find the exact spots of amazing photo locations.  Searching for a spot is  made easy with our built in tag fields as well as giving users the ability to create custom tags.  And, of course, users can also search by location.  If you have a photo shoot coming up find your next shot on Pixel Spot!

___

###Installation
- There is nothing needed to install to use Pixel Spot.  Please click on this link or copy and paste it to your browser: (link coming soon!)

___

###Technologies Used

- AJAX
- Bootstrap
- CSS
- Express 
- Flickr API
- GeoNames API
- Git
- GitHub
- Google API
- HTML
- Heroku
- JavaScript/jQuery 
- MongoDB
- MongoLab
- Node.js

___

###Technology details, requirements & notes
- Heroku is used for online deployment for the app
    - run `heroku config:set` for each environment variable
    - database is running from MongoLab.  Connecting the database requires the Heroku add-on for MongoLab.  The add-on is free, but it requires you to enter credit card information to validate the account.
- MongoLab is used to host the app's database
  - seed data for seeding a mongo database is in seed.js, run with `node seed.js`
  - run this command to import the data:
  
```
mongoimport -h ds012345.mongolab.com:56789 -d dbname -c collectionname -u dbuser -p dbpassword --file filename.json
```
- Flickr API is used for getting geo-location information and hosting images.  API key for Flickr is required, check the Flickr API documentation for obtaining a key:
  - [Flickr API](https://www.flickr.com/services/apps/create/apply)
- Google API is used for OAuth and mapping.  API key for Google is required, check the Google API documentation for obtaining a key:
  - [Google API](https://developers.google.com/+/web/api/rest/oauth#apikey)
- GeoName API allows the app to search by zipcode.  An account and API key for GeoName is required, check the GeoName API documentation for obtaining a key:
  - [GeoNames API](http://www.geonames.org/export/web-services.html)

___

[Trello Board](https://trello.com/b/KkLQVJFb/pixel-spot) (Includes data models, wireframes, and our presentation deck)  

___  

###Development Process

->![Wayne](https://i.imgur.com/z40rtWL.png =150x)<-

The Wayne Enterprises team consists of General Assembly students enrolled in the Web Development Immersive program (also known as WDI-DTLA-6).  The team was selected by the program's instructors and we were given a few days to discuss potential app ideas before the sprint week started.  We decided to make Pixel Spot because we felt it was an app that had immediate real world application and we could meet our project's requirements by:

- Using MongoDB & Express to CRUD data
- Producing a RESTful API that exposes at least one model
- Consuming its own API using AJAX
- Authenticating users using at least one OAuth provider
- Restricting access to the Creation, Updating & Deletion of resource(s) using an authorization middleware function
- Be deployed online using Heroku

After deciding on our idea we began to dicuss user stories, the different APIs we could consume, our models, and we started wireframing the general look and mapping of our app's site.  A link to our Trello board is provided above which contains our user stories, wireframes, data models and presentation deck.

We will be using the Flickr API to host images and access those images' geo-location information.  This will allow our users to search for spots by location and it gives us the ability to plug that information into Google's API and display a map for the users to see exactly where a location is.  We are also using Google's API for OAuth.  

Our API lets users create photo "spots" to share with others and allow them to add tags to make their spot easier for others to find.  A user can have one or many spots, and spots can have one or many tags.  A spot consists of a title, image, description, address, rating and tags.  The API also grabs the geo-location information from the image so that information can be used on a map and for searching.  In addition to searching by location users can search by tags which will give users a lot of control over what types of locations they will see based on the type of photoshoot they desire.  

___

###Unsolved Problems/Major Hurdles

- We require a specific url pattern to be able to parse the url for the information we need
- When using geo-location the data doesn't always map exactly back to a specific zipcode.  There's not a one-to-one relationship between lattitude/longitude and zipcodes 
