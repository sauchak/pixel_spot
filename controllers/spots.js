// Require resource's model(s).
var User = require("../models/user");

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
  User.find({"spots._id":req.params.id}, function(err,users){
    var spot = users[0].spots.filter(function(s){
      return s._id == req.params.id;
    });
      res.render('spots/show', {spot: spot});
  }).select('spots');
};


var newSpot = function(req, res, next) {
  res.render('spots/new');
};

//Create a new spot
var create = function(req, res, next) {
  console.log('got to POST');
  User.findById("5653e1e953d4e09f25b9a37f", function(err, user){ //user id is hardcoded to run in Postman, change to req.user.id later
  console.log(user.name);
    var title = req.body.title,
        description = req.body.description,
        image_url = req.body.image_url,
        address = req.body.address,
        rating = 0,
        tags = req.body.tags;
    console.log(req.body);
    user.spots.push({
      title: title,
      description: description,
      image_url: image_url,
      address: address,
      rating: rating,
      tags: {tag_name: tags} //need logic on how to insert multiple tags data into tagSchema
    });
    user.save(function(err) {
      res.render('spots/new');
    });
  });

};

module.exports = {
  index: index,
  show: show,
  create: create,
  new: newSpot
}



