var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

module.exports = function() {
  var schema = new Schema({
    bar_id : String,
    _user : [{ type: Schema.Types.ObjectId, ref: 'User' }]
  });

  mongoose.model('Hangout', schema);
}