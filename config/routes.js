var express = require('express'),
    router  = new express.Router();

// Require controllers.
var welcomeController = require('../controllers/welcome');
var usersController   = require('../controllers/users');
var spotsController   = require('../controllers/spots')

// root path:
router.get('/', welcomeController.index);

// users resource paths:
router.get('/users', usersController.index); // to show a list of users
router.get('/users/:id', usersController.show); // to show one user

// spots resource paths:
router.get('/spots', spotsController.index); // to show spots search results
router.get('/spots/:id', spotsController.show); // to show one spot
// router.post('/:userid/spot', spotsController.create); // create a new spot
// router.put('/:userid/spot/:id', spotsController.update); // to edit a spot
// router.get('/:userid/spots', spotsController.spotsforuser); // to show all of a user's spots
// router.delete('/:userid/spot/:id', spotsController.destroy); // to delete a spot

module.exports = router;
