// Require resource's model(s).
var User = require("../models/user");

var show = function(req, res, next){
  User.findById(req.params.id, function(error, otherUser){
    if (error) res.json({message: 'Could not find user because ' + error});
    res.render('users/show', {user: req.user, otherUser: otherUser});
  });
};

module.exports = {
  show:  show
};
