
/**
 * @list dependencies
 **/

var Promise = require('node-promise').Promise;

/**
 * @description Wrapper for models to return promises versus executing immediately
 **/

exports.Model = function(mongooseModel) {
  this.baseModel = mongooseModel;
};

/**
* @method find
* @description Wraps mongodb find with a promise
**/

exports.Model.prototype.find = function find(query, fields, options) {
  var promise = new Promise();
  this.baseModel.find(query, fields, options, function(error, results) {
    if (error) {
      promise.reject(error, true);
    } else {
      promise.resolve(results);
    };
  });
  return promise;
};

/**
 * @method findOne
 * @description Wraps mongodb findOne with a promise
 **/

exports.Model.prototype.findOne = function findOne(query, fields, options) {
  var promise = new Promise();
  this.baseModel.findOne(query, fields, options, function(error, results) {
    if (error) {
      promise.reject(error, true);
    } else {
      promise.resolve(results);
    };
  });
  return promise;
};

/**
* @method create
* @description Wraps mongodb create with a promise
**/

exports.Model.prototype.create = function create(data) {
  var promise = new Promise();
  this.baseModel.create(data, function(error, result) {
    if (error) {
      if (error.message && error.message.match(/E11000/i)) {
        promise.reject(new Error('Duplicate Key Error'), true);
      } else {
        promise.reject(error, true)
      };
    } else {
      promise.resolve(result);
    };
  });
  return promise;
};

/**
 * @method findOrCreate
 * @description Searches for a document, otherwise creates it.
 **/

exports.Model.prototype.findOrCreate = function findOrCreate(query, document, options) {
  var promise = new Promise();
  var baseModel = this;
  baseModel.findOne(query, function(error, result) { 
    if (error) {
      if (error.message && error.message.match(/E11000/i)) {
        promise.reject(new Error('Duplicate Key Error'), true);
      } else {
        promise.reject(error, true);
      };
    } else {
      if (result && result !== null) {
        // already exists
        promise.resolve(result);
      } else {
        // need to  create
        var createPromise = baseModel.create(document);
        createPromise.then(function(result) {
          promise.resolve(result);
        }, function(error) {
          promise.reject(error, true);
        });
      }
    };
  });
  return promise;
};

/* EOF */