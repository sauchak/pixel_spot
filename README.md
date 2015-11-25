![Wayne](https://i.imgur.com/z40rtWL.png =200x)

https://morning-spire-1673.herokuapp.com
### Wayne Enterprises Presents   
___
___   
#Heroku install notes
-Run Heroku config:set for each environment variable
-Database is running from MongoLab hosted website.  Connecting the database requires the Heroku add-on for MongoLab.  The add-on is free, but it requires you to enter credit card information to validate the account.
-Seed data for a MongoLab database is in mongolab_seed.json.  Run this command to import the data: mongoimport -h ds012345.mongolab.com:56789 -d dbname -c collectionname -u dbuser -p dbpassword --file filename.json

#Other requirements/installation notes
-API keys for Flickr, Google are required.  Flickr is used for getting geolocation information and hosting images.  Google is used for mapping.  Also a GeoNames account is required to use their API.  Check their respective documentation for obtaining appropriate resources
https://www.flickr.com/services/apps/create/apply
https://developers.google.com/+/web/api/rest/oauth#apikey
http://www.geonames.org/export/web-services.html

-Seed data for seeding a mongo database is in seed.js.  Run with 'Node seed.js'
   
# Pixel Spot    


[Trello](https://trello.com/b/KkLQVJFb/pixel-spot)
___
