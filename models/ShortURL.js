
/**
 * @model ShortURL
 **/

var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var ShortURLSchema = new Schema({
  id         : { 'type' : ObjectId },
  URL        : { 'type' : String },
  qr         : { 'type' : String },
  hash       : { 'type' : String, unique: true },
  hits       : { 'type' : Number, 'default': 0 },
  created_at : { 'type' : Date, 'default': Date.now },
  uniques    : { 'type' : Number, 'default': 0},
  visitors   : { 'type' : [String]},
  data       : { 'type'  : Schema.Types.Mixed }
});

var ShortURL = mongoose.model('ShortURL', ShortURLSchema);

/**
 * @model ShortURL
 * @method findByHash
 * @param {String} hash
 * @param {Function} callback
 **/

ShortURL.findByHash = function (hash, options, callback) {
  options.hash = hash;
  ShortURL.findOne({ hash: hash }, function (error, URL) {
    if (error) {
      callback(error, null);
    } else {
      if (URL) {
        ShortURL.updateHitsById(URL, options, callback);
      } else {
        callback(null, null);
      }
    }
  });
};

/**
 * @model ShortURL
 * @method updatehitsById
 * @param {ObjectId} id
 * @param {Function} callback
**/

ShortURL.updateHitsById = function (URL, options, callback) {
  if (options && options.visitor && URL.visitors.indexOf(options.visitor) === -1) {
    ShortURL.update({'hash': options.hash}, {
      $inc: {hits: 1, uniques: 1}, $push: {visitors: options.visitor}}, { multi: true}, function (error) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, URL);
      }
    });
  } else {
    ShortURL.update({'hash': options.hash}, { $inc: {hits: 1}}, { multi: true}, function (error) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, URL);
      }
    });
  }
};

module.exports = ShortURL;

/* EOF */