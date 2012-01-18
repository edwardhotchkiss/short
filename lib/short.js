
/*!
  Core Modules
 */

var mongoose = require('mongoose')
  , ShortURL = require(__dirname+'/../models/ShortURL.js');

/*!
  @method hasher
  @param {String} URL URL to be hashed
  @returns {String} hash Base 62 hash representation of the URL
 */

var hasher = exports.hasher = function(URL, length){
  if (!length) length = 6;
  var AUID = [],
      CHARS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  for (var i = 0; i < length; i++) {
    AUID.push(CHARS[Math.floor(Math.random()*62)]);
  }
  return AUID.join('');
};

/*!
 @method connect
 @param {String} mongdb Mongo DB String to connect to
 */

var connect = exports.connect = function(mongodb){
  mongoose.connect(mongodb);
  // expose connection object
  exports.connection = mongoose.connection;
};

/*!
 @method generate
 @param {String} URL URL to create a Short URL of
 @param {Functon} callback Callback to execute on completion
 */

var generate = exports.generate = function(URL, options, callback){
  var hashedURL;
  // options takes an optional object literal
  // right now it only supports an options.length argument
  if (arguments.length === 2  && arguments[1] instanceof Function) {
    callback = arguments[1];
    hashedURL = hasher(URL);
  }
  else if (arguments.length === 3  && arguments[1] instanceof Object && arguments[2] instanceof Function) {
    hashedURL = (options.length) ? hasher(URL, options.length) : hasher(URL);
  }
  else {
    throw new Error("generate requires a URL and callback function!");
  }
  var item = new ShortURL({
    URL : URL,
    hash : hashedURL
  });
  item.save(function(error, item){
    // tries to save to mongodb, if it exists it retries
    if (error && error.code === 11000) {
      console.log(hashedURL + ' already exists! retrying!');
      if (options) {
          generate(URL, options, callback);
      } else {
          generate(URL, callback);
      }
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

var retrieve = exports.retrieve = function(hash, options, callback){
  if (arguments.length === 2  && arguments[1] instanceof Function) {
    callback = arguments[1];
    options = null;
  } else if (arguments.length === 3  && arguments[1] instanceof Object && arguments[2] instanceof Function) {
  // options takes an optional object literal
  // right now it only supports an options.visitor argument
  } else {
    throw new Error("retrieve requires a hash and callback function!");
  }
  ShortURL.findByHash(hash, options, function(error, shortenedURLObject) {
    if (error) {
      callback(error, null);
    } else if (shortenedURLObject) {
      callback(null, shortenedURLObject);
    } else {
      callback(null, null);
    }
  });
};

/* EOF */