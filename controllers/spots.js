// Require resource's model(s).
var User = require("../models/user");
var rp = require("request-promise");
var env = require('../config/environment');

//Show Results from Search Function (finding tags embedded in spots and returning those spots to view)
var index = function (req, res, next) {

  User.find({}, function(error, users){
    var tagSearch = 'cat'; //route our search parameters to here
    var spots = [];
    users.forEach(function(user) {
      spots = spots.concat(user.spots);
    });
    spots = spots.filter(function(spot) {
      var found = false;
      spot.tags.forEach(function(tag) {
        if (tag.tag_name === tagSearch) found = true;
      });
      return found;
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


//Create a new spot
var create = function(req, res, next) {

  var title = req.body.title,
      description = req.body.description,
      flickrUrl = req.body.flickr_url,
      address = req.body.address,
      rating = 0,
      tags = req.body.tags;

  var self = res;
  // TODO (Wayne) CHANGE THIS BEFORE GOING INTO PRODUCTION -- TESTING ONLY!!!
  userId = req.body.userid;

  User.findById(userId, function(err, user){
    // FIXME | CHANGE VARIABLE NAMES if i have time later go back and refactor the regex to be something better cause this one is terrible
    var re = /https:\/\/www\.flickr\.com\/photos\/(.*)/i
    var res = re.exec(flickrUrl)[1].split('/')

    userId = res[0];
    photoId = res[1];
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
      zipcode = JSON.parse(data).postalCodes[0].postalCode;

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
        tags: {tag_name: tags} //need logic on how to insert multiple tags data into tagSchema
      });
      user.save(function(err) {
        self.render('spots/new');
      });
    })
  });
};

// Edit a spot
var update = function(req, res, next) {
  User.findById(userId, function(err, user){ //user id is hardcoded to run in Postman, change to req.user.id later
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
  User.find({"spots._id":spotId}, function(err, user){ //user id is hardcoded to run in Postman, change to req.user.id later
    user[0].spots.id(spotId).remove();
    user[0].save(function(err){
      res.render('welcome/index'); // fix the routes because only welcome index
    });
  });
};
//search view and paths//
var search = function (req, res, next) {

  User.find({}, function(error, users){
    var tagSearch = 'cat'; //route our search parameters to here
    var spots = [];
    users.forEach(function(user) {
      spots = spots.concat(user.spots);
    });
    spots = spots.filter(function(spot) {
      var found = false;
      spot.tags.forEach(function(tag) {
        if (tag.tag_name === tagSearch) found = true;
      });
      return found;
    });
    res.render('spots/search', {spots: spots});
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



