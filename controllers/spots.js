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
      spots.sort(function(bot, top){
        return parseFloat(top.rating) - parseFloat(bot.rating);
      });
    });
    res.render('welcome/index', {spots:spots});
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

var vote = function(req, res, next) {
  User.findOne({"spots._id":req.params.id}).select('spots').exec(function(err, user){
    var spots = user.spots.filter(function(s){
      return s._id == req.params.id;
    });
    spots[0].rating += parseInt(req.query.vote);
    user.save(function(err) {
      res.json(JSON.stringify(spots[0].rating));
    });
  });
};

var newSpot = function(req, res, next) {
  var emptySpot = [{
    title:"",
    description: "T",
    flickr_url: "",
    image_url:"",
    address:"",
  }];
  res.render('spots/new', {spot:emptySpot, additionalTags:""});
};

var edit = function(req, res, next) {
  User.findOne({"spots._id":req.params.id}).select('spots').exec(function(err, user){
    var spots = user.spots.filter(function(s){
      return s._id == req.params.id;
    });
    var defaultTags = ['nature','urban','family','beach','park','engagement','garden','museum','wedding'];
    var additionalTags = _.chain(spots[0].tags).pluck('tag_name').difference(defaultTags).value().join();
    res.render('spots/edit',{spot:spots[0], additionalTags:additionalTags});
  });
};

//Create a new spot
var create = function(req, res, next) {
  var title = req.body.title,
      description = req.body.description,
      flickrUrl = req.body["flickr-url"],
      address = req.body.address,
      rating = 0;

  var tags = [];
  var defaultTags = "";
  if (req.body.tags) { defaultTags = req.body.tags; }

  if (defaultTags.length > 0)
  {
    if (!Array.isArray(defaultTags)) { defaultTags = [defaultTags] };
    if (defaultTags.length>0) { tags = aryToTagObj(defaultTags) };
  }

  var additionalTags = req.body["additional-tags"];
  if (additionalTags.length>0)
  {
    additionalTags = strToTagObj(additionalTags)
    tags = tags.concat(additionalTags);
  };

  userId = res.locals.user._id;
  address = "";

    var re = /https:\/\/www\.flickr\.com\/photos\/(.*)/i
    var regexResult = re.exec(flickrUrl)[1].split('/')

    photoId = regexResult[1];

  User.findById(userId, function(err, user){
    // FIXME | if i have time later go back and refactor the regex to be something better cause this one is terrible
    // TODO | add error checking for url to make sure it is valid or the code blows up
    // get farm, server, and secret from user, filter on photo id
    var flickrApi = "https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=" + env.FLICKR_KEY + "&photo_id=" + photoId + "&format=json&nojsoncallback=1"
    rp.get(flickrApi)
    .then(function(data){
      data = JSON.parse(data);
      // generate url directly to image
      imageUrl = "https://farm" + data.photo.farm + ".staticflickr.com/" + data.photo.server + "/" + photoId + "_" + data.photo.secret + ".jpg";
      // get getlocation using flickr
      lat = data.photo.location.latitude;
      lng = data.photo.location.longitude;
      accuracy = data.photo.location.accuracy;
      var geoApi = "http://api.geonames.org/findNearbyPostalCodesJSON?lat=" + lat + "&lng=" + lng + "&username=pixelspot"
      return rp.get(geoApi)
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
        res.redirect('/');  // TODO: why doesn't render work?  i have to redirect to make it work
      });
    })
  });
};

// Edit a spot
var update = function(req, res, next) {
  var title = req.body.title,
      description = req.body.description,
      flickrUrl = req.body["flickr-url"],
      address = req.body.address,
      rating = 0;
  var tags = [];
  var defaultTags = "";
  if (req.body.tags) { defaultTags = req.body.tags; }

  if (defaultTags.length > 0)
  {
    if (!Array.isArray(defaultTags)) { defaultTags = [defaultTags] };
    if (defaultTags.length>0) { tags = aryToTagObj(defaultTags) };
  }

  var additionalTags = req.body["additional-tags"];
  if (additionalTags.length>0)
  {
    additionalTags = strToTagObj(additionalTags)
    tags = tags.concat(additionalTags);
  };

  userId = res.locals.user._id;
  address = "";

    var re = /https:\/\/www\.flickr\.com\/photos\/(.*)/i
    var regexResult = re.exec(flickrUrl)[1].split('/')

    photoId = regexResult[1];

  User.findById(userId, function(err, user){
    // FIXME | if i have time later go back and refactor the regex to be something better cause this one is terrible
    // TODO | add error checking for url to make sure it is valid or the code blows up
    // get farm, server, and secret from user, filter on photo id
    var flickrUrl = "https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=" + env.FLICKR_KEY + "&photo_id=" + photoId + "&format=json&nojsoncallback=1"
    rp.get(flickrUrl)
    .then(function(data){
      data = JSON.parse(data);
      // generate url directly to image
      imageUrl = "https://farm" + data.photo.farm + ".staticflickr.com/" + data.photo.server + "/" + photoId + "_" + data.photo.secret + ".jpg";
      // get getlocation using flickr
      lat = data.photo.location.latitude;
      lng = data.photo.location.longitude;
      accuracy = data.photo.location.accuracy;
      var geoUrl = "http://api.geonames.org/findNearbyPostalCodesJSON?lat=" + lat + "&lng=" + lng + "&username=pixelspot"
      return rp.get(geoUrl)
    })
    .then(function(data){
//      zipcode = JSON.parse(data).postalCodes[0].postalCode;
zipcode = ""
      var spotId = req.params.id
      var spot = user.spots.id(spotId)
      spot.title = req.body.title,
      spot.description = req.body.description,
      spot.image_url = imageUrl,
      spot.address = req.body.address,
      spot.rating = 0,
      spot.tags = tags;
      user.save(function(err, user) {
        res.json(JSON.stringify(res.locals.user._id));
      });
    })
  });


/*
  User.findById(res.locals.user._id, function(err, user){
    var spotId = req.params.id
    var spot = user.spots.id(spotId)
        spot.title = req.body.title,
        spot.description = req.body.description,
        spot.image_url = req.body.image_url,
        spot.address = req.body.address,
        spot.rating = 0,
        spot.tags = req.body.tags;
    user.save(function(err, user) {
      res.json(JSON.stringify(res.locals.user._id));
    });
  });
*/
};

//Delete a new spot
var destroy = function(req, res) {
  spotId = req.params.id;
  User.find({"spots._id":spotId}, function(err, user){
    if (error) { console.log(error); }
    user[0].spots.id(spotId).remove();
    user[0].save(function(err){
      res.json(JSON.stringify(spotId));
    });
  });
};

// grabs the data from the search input (in the menu bar) and redirects to the view page
var search = function (req, res, next) {
  var tags = "";
  if (req.query.tags)
  {
      tags = strToTags(req.query.tags);
  }
  var tagQuery = {"spots.tags.tag_name":{"$in":tags}};

  User.find(tagQuery, function(error, users){
    if (error) { console.log(error); }
    var spots = _.chain(getSpots(users,tags)).sortBy('rating').reverse();
    res.render('spots/search', {spots:JSON.stringify(spots)})
  });
};

var advancedSearch = function (req, res, next) {
  var tags = "";
  var defaultTags = "";
  if (req.query.defaultTags)
  {
    defaultTags = strToTags(req.query.defaultTags);
  }

  var addTags = strToTags(req.query.additionalTags);
  tags = defaultTags.concat(addTags);

  var tagQuery = {"spots.tags.tag_name":{"$in":tags}};
  User.find(tags, function(error, users){
    if (error) { console.log(error); }
    var spots = _.chain(getSpots(users,tags)).sortBy('rating').reverse();
    res.json(JSON.stringify(spots));
  });
};

module.exports = {
  index: index,
  show: show,
  vote: vote,
  create: create,
  edit: edit,
  new: newSpot,
  update: update,
  destroy: destroy,
  advancedSearch: advancedSearch,
  search: search
};

// convert array to tag object as key:value pair
function aryToTagObj(ary)
{
  return _.map(ary,function(tag){ return {tag_name: tag.toLowerCase()}})
}

// convert comma delimited string to tag object as key:value pair
function strToTagObj(str)
{
  str = str.split(',');
  return _.map(str,function(tag) { return {tag_name: tag.trim().toLowerCase()}; });
}

// convert comma delimited sting to array of tags
function strToTags(str)
{
  str = str.split(',');
  return _.map(str,function(tag) { return tag.trim().toLowerCase(); });
}

function getSpots(users,tags)
{
  var spots = [];
  users.forEach(function(user) {
    spots = spots.concat(user.spots);
  });
  spots = spots.filter(function(spot) {
    var found = false;
    spot.tags.forEach(function(tag) {
      if (tags.indexOf(tag.tag_name) >= 0) found = true;
    });
    return found;
  });
  return spots
}
