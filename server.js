'use strict';

var express = require('express');
var mongo = require('mongodb');
var passport = require('passport');
var routes = require('./app/routes/index.js');
var mongoose = require('mongoose');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var bodyParser = require('body-parser');

var app = express();

var mongoUrl = process.env.MONGOLAB_URI || "mongodb://localhost:27017/rvg-nightlife-coordination";
var port = process.env.PORT || 3000;

mongoose.connect(mongoUrl);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {

  console.log('Successfully connected to MongoDB on ' + mongoUrl);

  app.use('/models', express.static(process.cwd() + '/app/models'));
  app.use('/public', express.static(process.cwd() + '/public'));
  app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
  app.set('view engine', 'jade');
  app.use( bodyParser.json() );       // to support JSON-encoded bodies
  app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
  }));

  var secret = process.env.SECRET || "secret";

  app.use(cookieParser());
  app.use(flash());

  app.use(session({secret: secret}));
  app.use(passport.initialize());
  app.use(passport.session());


  require('./config/passport')(passport);

  var Hangout = require('./app/models/hangout');
  var newHangout = new Hangout;

  routes(app, mongoose, passport);

  app.listen(port, function () {
    console.log('Node.js listening on port ' + port + '...');
  });
});
