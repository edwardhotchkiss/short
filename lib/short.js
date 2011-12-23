
/*!
  Core Modules
 */

var mongoose = require('mongoose'),
    base = require('base-converter'),
    ShortURL = require(__dirname+'/../models/ShortURL.js');

/*!
  Expose the ShortURL Model
 */

exports.ShortURL = ShortURL;

/*!
  @method hasher
  @param {String} URL URL to be hashed
  @returns {String} hash Base 62 hash representation of the URL
 */

function hasher(URL) {
  // generates a 3 to 7 digit number
  var id = Math.floor(Math.random() * 3500000000000) + 3845,
      hash = base.decTo62(id);
  return hash;
}

/*!
 @method connect
 @param {String} mongdb Mongo DB String to connect to
 */

exports.connect = function (mongodb) {
  mongoose.connect(mongodb);
  mongoose.connection.on('open', function(){
    console.log('mongodb connected');
  });
  mongoose.connection.on('error', function(error){
    throw new Error(error);
  })
};

/*!
 @method gen
 @param {String} URL URL to create a Short URL of
 @param {Functon} callback Callback to execute on completion
 */

exports.gen = function (URL, callback) {
  var hashedURL = hasher(URL);
  var item = new ShortURL({
    URL : URL,
    hash : hashedURL
  });
  item.save(function (error, item) {
    //Tries to save to mongodb, if it exists it retries
    if (error && error.code === 11000) {
      console.log(hashedURL + ' already exists! Retrying!');
      short.gen(URL, callback);
    } else {
      callback(null, item);
    }
  });
};

/*!
 @method get
 @param {String} hash Hashed Base 62 URL to retrieve
 @param {Functon} callback Callback to execute on completion
 */

exports.get = function (hash, callback) {
  ShortURL.findByHash(hash, function (error, URL) {
    if (error) {
      callback(error, null);
    } else {
      callback(null, URL);
    }
  });
};

/* EOF */