
/*!

  Mongoose Model:
    - ShortURL

 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var ShortURLSchema = new Schema({
  id          : ObjectId,
  URL         : String,
  hash        : { type : String, unique: true },
  hits        : { type : Number, default: 0 },
  created_at  : { type : Date, default: Date.now }
});

var ShortURL = mongoose.model('ShortURL', ShortURLSchema);

/*!
  @method findByHash
  @param {String} hash
  @param {Function} callback
*/


ShortURL.findByHash = function(hash, callback) {
  ShortURL.find({ hash: hash }, function(error, URL) {
    if (error) {
      callback(error, null);
    } else {
      if (URL.length !== 0) {
        var id = URL[0]._id;
        ShortURL.updateHitsById(id, function(error) {
          if (error) {
            callback(error, null);
          } else {
            callback(null, URL);
          }
        });
      } else {
        callback(null, null);
      }
    }
  });
};

/*!
  @method updatehitsById
  @param {ObjectId} id
  @param {Function} callback
*/

ShortURL.updateHitsById = function(id, callback) {
  ShortURL.findById(id, function (error, URL) {
    var hits = URL.hits + 1;
    if (!error) {
      URL.hits = hits;
      URL.save(function(error) {
        callback(error);
      });
    }
  });
};

module.exports = ShortURL;

/* EOF */