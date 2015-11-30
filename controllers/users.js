// Require resource's model(s).
var User = require("../models/user");

var show = function(req, res, next){
  User.findById(req.params.id, function(error, otherUser){
    if (error) res.json({message: 'Could not find user because ' + error});
    var valid = (req.user._id.toString() == otherUser._id.toString());
    res.render('users/show', {user: req.user, otherUser: otherUser, valid: valid});
  });
};

module.exports = {
  show:  show
};
