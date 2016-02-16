'use strict';

function pages_controller () {  
  this.home = function (req, res) {      
    res.render('bars/index', { user: req.user });
  }

  this.search = function (req, res) {      
    var terms = req.query.city;
    
    var request = require('request');

    var Yelp = require('yelp');

    var yelp = new Yelp({
      consumer_key: process.env.OAUTH_CONSUMER_KEY,
      consumer_secret: process.env.CONSUMER_SECRET,
      token: process.env.OAUTH_TOKEN,
      token_secret: process.env.TOKEN_SECRET,
    });

    yelp.search({ location: terms })
    .then(function (response) {
      res.render('bars/index', { bars: response.businesses, 
                                 user : req.user,
                                 path : req.protocol + '://' + req.get('host') + req.originalUrl });
    })
    .catch(function (err) {
      res.end(data);
    });
  }
}

module.exports = pages_controller;
