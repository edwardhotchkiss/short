
/**
 * @list dependencies
 **/

var mongoose = require('mongoose')
  , hasher = exports.hasher = require('./hasher').hasher
  , ShortURL;

/**
 * @method connect
 * @param {String} mongdb Mongo DB String to connect to
 **/

var connect = exports.connect = function(mongodb) {
  mongoose.connect(mongodb);
  // expose connection object
  exports.connection = mongoose.connection;
  createModel();
};

/**
 * @public createConnection
 * @description This will create a connection, instead of using the global mongo connection.
 **/

exports.createConnection = function createConnection(MongoURI) {
  var connection = exports.connection = mongoose.createConnection(MongoURI, function(error) {
    if (error) {
      console.log('connection error: ' + require('util').inspect(error));
    }
  });
  // Event when the db is connected
  connection.once('open', function()  {
    console.log('short package opened connection to mongo db: ' + MongoURI);
  });
  createModel();
}

/**
 * @method createModel
 * Connect after a connection has been declared
 * it is OK if not connected yet, mongoose buffers request
 **/

function createModel() {
  ShortURL = exports.ShortURL = require('../models/ShortURL');
}

/**
 * @method generate
 * @param {String} URL URL to create a Short URL of
 * @param {Functon} callback Callback to execute on completion
 **/

var generate = exports.generate = function(URL, options, callback) {
  var hashedURL
    , customData;
  // options takes an optional object literal
  // right now it only supports an options.length argument
  if (arguments.length === 2  && arguments[1] instanceof Function) {
    callback = arguments[1];
    hashedURL = hasher(URL);
  } else if (arguments.length === 3  && arguments[1] instanceof Object && arguments[2] instanceof Function) {
    hashedURL = (options.length) ? hasher(URL, options.length) : hasher(URL);
    customData = (options.data) ? options.data : null;
  } else {
    throw new Error("generate requires a URL and callback function!");
  };
  var item = new ShortURL({
    URL  : URL,
    hash : hashedURL
  });
  if (customData) {
    item.data = customData;
  };
  item.save(function(error, item){
    // tries to save to mongodb, if it exists it retries
    if (error && error.code === 11000) {
      if (options) {
        generate(URL, options, callback);
      } else {
        generate(URL, callback);
      };
    } else {
      callback(null, item);
    }
  });
};

/**
 * @method retrieve
 * @param {String} hash Hashed Base 62 URL to retrieve
 * @param {Functon} callback Callback to execute on completion
 **/

var retrieve = exports.retrieve = function(hash, options, callback) {
  if (arguments.length === 2  && arguments[1] instanceof Function) {
    callback = arguments[1];
    options = {};
  } else if (arguments.length === 3  && arguments[1] instanceof Object && arguments[2] instanceof Function) {
  // options takes an optional object literal
  // right now it only supports an options.visitor argument
  } else {
    throw new Error('retrieve requires a hash and callback function!');
  };
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

/**
 * @method list
 * @param {Function} callback
 * List all Shortened URLs
 **/

var list = exports.list = function(callback) {
  ShortURL.find({}, function(error, urls) {
    if (error) {
      callback(error, null);
    } else {
      callback(null, urls);
    }
  });
};

/* EOF */