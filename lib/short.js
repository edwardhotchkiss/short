
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

exports.connect = function(mongodb) {
  mongoose.connect(mongodb);
  exports.connection = mongoose.connection;
};

/**
 * @method generate
 * @param {Object} options Must at least include a `URL` attribute
 **/

exports.generate = function(document) {
  var promise = new Promise();
  var _generatedHash = ID.store(document.URL);
  var query = {
    URL : document.URL
  };
  var options = {
  };
  document['hash'] = _generatedHash;
  document['data'] = (document.data) ? document.data : null;
  var generatePromise = ShortURL.findOrCreate(query, document, options);
  generatePromise.then(function(ShortURLObject) {
    promise.resolve(ShortURLObject);
  }, function(error) {
    promise.reject(error, true);
  });
  return promise;
};

/**
 * @method retrieve
 * @param {Object} options Must at least include a `hash` attribute
 **/

exports.retrieve = function(hash) {
  var promise = new Promise();
  var retrievePromise = ShortURL.findOne({ hash : hash });
  retrievePromise.then(function(ShortURLObject) {
    if (ShortURLObject && ShortURLObject !== null) {
      promise.resolve(ShortURLObject);
    } else {
      promise.reject(new Error('MongoDB - Cannot find Document'), true);
    };
  }, function(error) {
    promise.reject(error, true);
  });
  return promise;
};

/**
 * @method list
 * @description List all Shortened URLs
 **/

exports.list = function() {
  var promise = new Promise();
  var listPromise = ShortURL.find({});
  listPromise.then(function(ShortenedURLObjects) {
    promise.resolve(ShortenedURLObjects);
  }, function(error) {
    promise.reject(error, true);
  });
  return promise;
};

/* EOF */