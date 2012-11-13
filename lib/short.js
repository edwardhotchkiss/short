
/**
 * @list dependencies
 **/

var mongoose = require('mongoose')
  , ID = require('short-id')
  , ShortURL;

/**
 * @configure short-id
 **/

ID.configure({
  length: 6,
  algorithm: 'sha1',
  salt: Math.random
});

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
      throw new Error(error);
    }
  });
  // Event when the db is connected
  connection.once('open', function()  {
    console.log('short package opened connection to mongo db: ' + MongoURI);
  });
  createModel();
};

/**
 * @method createModel
 * Connect after a connection has been declared
 * it is OK if not connected yet, mongoose buffers request
 **/

function createModel() {
  ShortURL = exports.ShortURL = require('../models/ShortURL');
};

/**
 * @method generate
 * @param {Object} options Must at least include a `URL` attribute
 * @param {Functon} callback Callback to execute on completion
 **/

var generate = exports.generate = function(options, callback) {
  var URL = options.URL
    , hashedURL = ID.store(URL);
  // setup model
  var item = new ShortURL({
    URL  : URL,
    hash : hashedURL
  });
  // check for custom data
  item.data = (options.data) ? options.data : null;
  // save
  item.save(function(error, item) {
    // tries to save to mongodb, if it exists it retries
    if (error && error.code === 11000) {
      generate(options, callback);
    } else if (error) {
      callback(error, null)
    } else {
      callback(null, item);
    };
  });
};

/**
 * @method retrieve
 * @param {Object} options Must at least include a `hash` attribute
 * @param {Functon} callback Callback to execute on completion
 **/

var retrieve = exports.retrieve = function (hash, callback) {
  ShortURL.findOne({ hash : hash }, function (error, shortenedURLObject) {
    if (error) {
      callback(error, null);
    } else {
      updateHitsById(shortenedURLObject, callback);
    };
  });
};

/**
 * @method updatehitsById
 * @param {ObjectId} id
 * @param {Function} callback
**/

var updateHitsById = exports.updateHitsById = function(options, callback) {
  if (options && options.visitor && options.URL.visitors.indexOf(options.visitor) === -1) {
    ShortURL.update({ hash : options.hash }, {
      $inc: { hits: 1, uniques: 1 }, $push: { visitors: options.visitor }}, { multi: true }, function(error) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, options);
      }
    });
  } else {
    ShortURL.update({ hash : options.hash}, { $inc: { hits: 1 } }, { multi: true }, function(error) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, options);
      }
    });
  };
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