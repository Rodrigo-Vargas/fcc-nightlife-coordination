'use strict';

function hangouts_controller (mongoose) {  
  this.create = function(req, res){
    var barId = req.params.id;
    
    var hangout = new Hangout({ bar_id : req.params.id, _user : req.user});

    hangout.save(function (err, hangout) {
      if (err)
      {
        console.error(err);
        req.flash('info', 'Error on insert hangout. Try again later.');
      }
      else
      {
        req.flash('info', 'Your hangout has been confirmed');
      }
      res.redirect('/');
    });
  }
}

module.exports = hangouts_controller;
