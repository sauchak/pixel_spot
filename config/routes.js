var express = require('express'),
    router  = new express.Router();

// Require controllers.
var usersController   = require('../controllers/users');
var spotsController   = require('../controllers/spots');

module.exports = function(app, passport) {
  app.use(function(req, res, next){
//    console.log("set user to " + req.user);
    res.locals.user = req.user;
    next();
  });

  // OAuth route
  router.get('/auth/google', passport.authenticate(
    'google',
    { scope: ['profile','email'] }
  ));

  // Google OAuth callback route
  router.get('/oauth2callback', passport.authenticate(
    'google',
    {
      successRedirect : '/',
      failureRedirect : '/'
    }
  ));

  // OAuth logout
  router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

  // root path:
  router.get('/', spotsController.index);

  // users resource paths:
  router.get('/users/:id', isLoggedIn, usersController.show); // to show one user

  // spots resource paths:
  router.get('/spots', spotsController.index); // to show spots search results
  router.get('/spots/:id', spotsController.show); // to show one spot
  app.get('/spots/new', isLoggedIn, spotsController.new); // to show the create page
  router.post('/spots/new', isLoggedIn, spotsController.create); // create a new spot
  router.get('/spots/:id/vote', isLoggedIn, spotsController.vote);
  router.get('/spots/search/all', spotsController.search);
  router.get('/spots/search/advanced', spotsController.advancedSearch);
  router.put('/spots/:id', isLoggedIn, spotsController.update); // save edits to a spot
  router.delete('/spots/:id', isLoggedIn, spotsController.destroy); // to delete a spot
  router.get('/spots/:id/edit', isLoggedIn, spotsController.edit); // show form for edit

  app.use('/',router)
}

function isLoggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}
