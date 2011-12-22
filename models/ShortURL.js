
/*!

  Model::ShortURL

 */

var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var shortURL_schema = {
  id          : ObjectId,
  URL         : String,
  hash        : { type : String, unique: true },
  hits        : { type : Number, default: 0 },
  created_at  : { type : Date, default: Date.now }
};

var ShortURLSchema = new Schema(shortURL_schema);
var ShortURL = mongoose.model("ShortURL", ShortURLSchema);

// search for a URL by its hash
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

// increment hits
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