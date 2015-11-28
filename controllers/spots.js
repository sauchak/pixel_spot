// Require resource's model(s).
var User = require("../models/user");
var rp = require("request-promise");
var env = require('../config/environment');
var _ = require("underscore");

//Show Results from Search Function (finding tags embedded in spots and returning those spots to view)
var index = function (req, res, next) {

  User.find({}, function(error, users){
    var spots = [];
    users.forEach(function(user) {
      spots = spots.concat(user.spots);
    });
    res.render('spots/index', {spots: spots});
  });
};

//Show one spot
var show = function(req, res, next) {
  User.findOne({"spots._id":req.params.id}).select('spots').exec(function(err, user){
    var spots = user.spots.filter(function(s){
      return s._id == req.params.id;
    });
    res.render('spots/show', {spot: spots[0]});
  });
};

//Upvote a spot
var upvote = function(req, res, next) {
  changeVote(req, res, 1);
};

//Downvote a spot
var downvote = function(req, res, next) {
  changeVote(req, res, -1);
};

var newSpot = function(req, res, next) {
  res.render('spots/new');
};

var findSpot = function(req, res, next) {
  res.render('spots/search',{spots:""});
};

//Create a new spot
var create = function(req, res, next) {
  var title = req.body.title,
      description = req.body.description,
      flickrUrl = req.body["flickr-url"],
      address = req.body.address,
      rating = 0,
      tags = req.body["additional-tags"],
      defaultTags = req.body.tags;

  defaultTags = _.map(defaultTags,function(tag){
    return {tag_name: tag.toLowerCase()}
  })

  tags = tags.split(',');
  tags = _.map(tags,function(tag) { return {tag_name: tag.trim().toLowerCase()}; });
  tags = tags.concat(defaultTags);

  // TODO (Wayne) CHANGE THIS BEFORE GOING INTO PRODUCTION -- TESTING ONLY!!!
//  userId = req.body.userid;
  userId = res.locals.user._id;
  address = "";

  User.findById(userId, function(err, user){
    // FIXME | CHANGE VARIABLE NAMES if i have time later go back and refactor the regex to be something better cause this one is terrible
    // TODO | add error checking for url to make sure it is valid or the code blows up
    var re = /https:\/\/www\.flickr\.com\/photos\/(.*)/i
    var regexResult = re.exec(flickrUrl)[1].split('/')

    userId = regexResult[0];
    photoId = regexResult[1];
    // get farm, server, and secret from user, filter on photo id
    rp.get("https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=" + env.FLICKR_KEY + "&photo_id=" + photoId + "&format=json&nojsoncallback=1")
    .then(function(data){
      data = JSON.parse(data);
      // generate url directly to image
      imageUrl = "https://farm" + data.photo.farm + ".staticflickr.com/" + data.photo.server + "/" + photoId + "_" + data.photo.secret + ".jpg";
      // get getlocation using flickr
      lat = data.photo.location.latitude;
      lng = data.photo.location.longitude;
      accuracy = data.photo.location.accuracy;

      return rp.get("http://api.geonames.org/findNearbyPostalCodesJSON?lat=" + lat + "&lng=" + lng + "&username=pixelspot")
    })
    .then(function(data){
//      zipcode = JSON.parse(data).postalCodes[0].postalCode;
zipcode = ""
      user.spots.push({
        title: title,
        description: description,
        flickr_url: flickrUrl,
        image_url: imageUrl,
        address: address,
        lat: lat,
        lng: lng,
        zipcode: zipcode,
        rating: rating,
        tags: tags //need logic on how to insert multiple tags data into tagSchema
      });
      user.save(function(err) {
        res.render('spots/new');
      });
    })
  });
};

// Edit a spot
var update = function(req, res, next) {
  User.findById(userId, function(err, user){
    var spotId = req.params.id
    var spot = user.spots.id(spotId)
        spot.title = req.body.title,
        spot.description = req.body.description,
        spot.image_url = req.body.image_url,
        spot.address = req.body.address,
        spot.rating = 0,
        spot.tags = req.body.tags;
    user.save(function(err, user) {
      res.render('welcome/index'); // fix the routes because only welcome index
    });
  });
};

//Delete a new spot
var destroy = function(req, res) {
  spotId = req.params.id;
  User.find({"spots._id":spotId}, function(err, user){
    user[0].spots.id(spotId).remove();
    user[0].save(function(err){
      res.render('welcome/index'); // fix the routes because only welcome index
    });
  });
};

// grabs the data from the search input and redirects to the view page
var search = function (req, res, next) {
  var tagList;
  if (req.query.tags)
  {
    tagList = req.query.tags.split(',');
    tagList = _.map(tagList,function(tag) { return tag.trim().toLowerCase(); });
  }

  tags = {"spots.tags.tag_name":{"$in":tagList}};
  User.find(tags, function(error, users){
    if (error) { console.log(error); }
    var spots = [];
    users.forEach(function(user) {
      spots = spots.concat(user.spots);
    });
    spots = spots.filter(function(spot) {
      var found = false;
      spot.tags.forEach(function(tag) {
        if (tagList.indexOf(tag.tag_name) >= 0) found = true;
      });
      return found;
    });
    res.render('spots/search', {spots:spots})
  });
};

var ajax = function (req, res, next) {
  var tagList = [];
  if (req.query.defaultTags)
  {
    tagList = req.query.defaultTags.split(',');
    tagList = _.map(tagList,function(tag) { return tag.trim().toLowerCase(); });
  }
  var addTags = req.query.additionalTags.split(',');

  addTags = _.map(addTags,function(tag) { return tag.trim().toLowerCase(); });
  tagList = tagList.concat(addTags);

  var tags = {"spots.tags.tag_name":{"$in":tagList}};
  User.find(tags, function(error, users){
    if (error) { console.log(error); }
    var spots = [];
    users.forEach(function(user) {
      spots = spots.concat(user.spots);
    });
    spots = spots.filter(function(spot) {
      var found = false;
      spot.tags.forEach(function(tag) {
        if (tagList.indexOf(tag.tag_name) >= 0)
          {
            found = true;
          }
      });
      return found;
    });
    res.json(JSON.stringify(spots));
  });
};



module.exports = {
  index: index,
  show: show,
  upvote: upvote,
  downvote: downvote,
  create: create,
  new: newSpot,
  update: update,
  destroy: destroy,
  find: findSpot,
  ajax: ajax,
  search: search
};

function changeVote(req, res, count) {
  User.findOne({"spots._id":req.params.id}).select('spots').exec(function(err, user){
    var spots = user.spots.filter(function(s){
      return s._id == req.params.id;
    });
    spots[0].rating += count;
    user.save(function(err) {
      res.redirect('/spots/' + spots[0]._id);
    });
  });
}
