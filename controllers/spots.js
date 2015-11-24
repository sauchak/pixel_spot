// Require resource's model(s).
var User = require("../models/user");

var index = function (req, res, next) {

  User.find({}, function(error, users){
    var tagSearch = 'cat';
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

module.exports = {
  index: index
}
