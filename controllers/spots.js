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

module.exports = {
  index: index,
  show: show,
  new: newSpot
}
