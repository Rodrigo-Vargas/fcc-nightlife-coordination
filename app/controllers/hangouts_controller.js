'use strict';

function hangouts_controller (mongoose) {  
  var Hangout = mongoose.model('Hangout');

  this.change = function(req, res){
    var hangoutObj = { bar_id : req.params.id, _user : req.user};


    Hangout.findOne(hangoutObj, function(err, hangout){
      if (err)
      {
        console.error(err);
        req.flash('info', 'Error on insert hangout. Try again later.');
      }

      if (hangout)
      {
        Hangout.remove( hangoutObj, function(err, hangout){
          if (err) {
            console.error(err);
            req.flash('info', 'Error on delete hangout. Try again later.');
          }

          Hangout.findById(hangout._id, function (err, hangout) {
            if (hangout)
              req.flash('info', 'Hangout not deleted');  
            else
              req.flash('info', 'You hangout has be canceled');  


            res.redirect('/');
          });
        });
      }
      else
      {
        var hangout = new Hangout(hangoutObj);

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
    });
  }
}

module.exports = hangouts_controller;
