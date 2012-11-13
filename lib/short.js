
/**
 * @list dependencies
 **/

var ID = require('short-id')
  , mongoose = require('mongoose')
  , Promise = require('node-promise').Promise
  , ShortURL = require('../models/ShortURL').ShortURL;

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
};

/**
 * @method generate
 * @param {Object} options Must at least include a `URL` attribute
 **/

exports.generate = function(document) {
  // setup promise
  var promise = new Promise();
  // create a hash
  var _generatedHash = ID.store(document.URL);
  // query
  var query = {
    URL : document.URL
  };
  // options
  var options = {
  };
  // add hash to document
  document['hash'] = _generatedHash;
  // perform upsert
  var generatePromise = ShortURL.findOrCreate(query, document, options);
  // pass
  generatePromise.then(function(ShortURLObject) {
    promise.resolve(ShortURLObject);
  // fail
  }, function(error) {
    promise.reject(error, true);
  });
  return promise;
};

/* EOF */