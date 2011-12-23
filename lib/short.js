
/*!
  Core Modules
 */

var mongoose = require('mongoose'),
    ShortURL = require(__dirname+'/../models/ShortURL.js');

/*!
  @method hasher
  @param {String} URL URL to be hashed
  @returns {String} hash Base 62 hash representation of the URL
 */

function hasher(URL){
  // 62
  var AUID = [],
      CHARS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  for (var i = 0; i < 6; i++) {
    AUID[i] = CHARS[Math.floor(Math.random()*62)];
  }
  return AUID.join('');
}

/*!
 @method connect
 @param {String} mongdb Mongo DB String to connect to
 */

function connect(mongodb){
  mongoose.connect(mongodb);
  // expose connection object
  exports.connection = mongoose.connection;
}

/*!
 @method generate
 @param {String} URL URL to create a Short URL of
 @param {Functon} callback Callback to execute on completion
 */

function generate(URL, callback){
  var hashedURL = hasher(URL);
  var item = new ShortURL({
    URL : URL,
    hash : hashedURL
  });
  item.save(function(error, item){
    // tries to save to mongodb, if it exists it retries
    if (error && error.code === 11000) {
      console.log(hashedURL + ' already exists! retrying!');
      short.generate(URL, callback);
    } else {
      callback(null, item);
    }
  });
}

/*!
 @method retrieve
 @param {String} hash Hashed Base 62 URL to retrieve
 @param {Functon} callback Callback to execute on completion
 */

function retrieve(hash, callback){
  ShortURL.findByHash(hash, function (error, shortenedURLObject) {
    if (error) {
      callback(error, null);
    } else if (shortenedURLObject) {
      callback(null, shortenedURLObject);
    } else {
      callback(null, null);
    }
  });
}

/*!
  Expose Yourself!
 */

exports.ShortURL = ShortURL;
exports.generate = generate;
exports.retrieve = retrieve;
exports.connect = connect;
exports.hasher = hasher;

/* EOF */