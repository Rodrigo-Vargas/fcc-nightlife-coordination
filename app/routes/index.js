'use strict';

var UsersController = require(process.cwd() + '/app/controllers/users_controller.js');
var PagesController = require(process.cwd() + '/app/controllers/pages_controller.js');
var HangoutsController = require(process.cwd() + '/app/controllers/hangouts_controller.js');
var BarsController = require(process.cwd() + '/app/controllers/bars_controller.js');

module.exports = function (app, mongoose, passport) {
  var usersController = new UsersController(mongoose);
  var pagesController = new PagesController();
  var hangoutsController = new HangoutsController(mongoose);
  var barsController = new BarsController(mongoose);

  var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
      return next(); 
    res.redirect('/login');
  }  

  app.get('/', pagesController.home);

  app.get('/search', pagesController.search);

  /* Login */
  app.get('/login', usersController.login);
 
  /*app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash : true
  }));*/

  app.post('/login', function(req, res, next) {    
    passport.authenticate('local-login', function(err, user, info) {
      if (err)
        return next(err);
      
      if (!user) 
        return res.redirect('/login');

      req.logIn(user, function(err) {
        if (err) 
          return next(err);
        
        if (req.body.url)
          return res.redirect(req.body.url)
        else
          return res.redirect('/');
      });
    })(req, res, next);
  })
  
  app.get('/signup', usersController.signup);
 
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash : true
  }));

  app.get('/hangouts/:id/change', isAuthenticated, hangoutsController.change);

  app.get('/bar/:id/hangouts', barsController.hangouts);

  app.get('/signout', usersController.signout);
};
