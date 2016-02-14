'use strict';

function bars_controller (mongoose) {
  var Hangout = mongoose.model('Hangout');


  this.hangouts = function(req, res){
    var barId = req.params.id;

    Hangout.find( { bar_id : barId }, function(err, hangouts){
      res.json(hangouts);
    });
  }
}

module.exports = bars_controller;
