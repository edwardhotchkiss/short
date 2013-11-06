
/**
 * @list dependencies
 */

var Promise = require('node-promise').Promise;

/**
 * @description wrapper for models to return promises versus executing immediately
 */

exports.Model = function(mongooseModel) {
  this.baseModel = mongooseModel;
};

/**
 * @method find
 * @description wraps mongodb find with a promise
 */

exports.Model.prototype.find = function(query, fields, options) {
  var promise = new Promise();
  this.baseModel.find(query, fields, options, function(error, result) {
    if (error) {
      promise.reject(error, true);
    } else {
      promise.resolve(result);
    };
  });
  return promise;
};

/**
 * @method findOne
 * @description wraps mongodb findOne with a promise
 */

exports.Model.prototype.findOne = function(query, fields, options) {
  var promise = new Promise();
  this.baseModel.findOne(query, fields, options, function(error, result) {
    if (error) {
      promise.reject(error, true);
    } else {
      promise.resolve(result);
    };
  });
  return promise;
};

/**
 * @method update
 * @description wraps mongodb update with a promise
 */

exports.Model.prototype.update = function(query, document, options) {
  var promise = new Promise()
  this.baseModel.update(query, document, options, function(error, affected) {
    if (error) {
      promise.reject(error, true);
    } else {
      if (affected === 0) {
        promise.reject(new Error('MongoDB - Cannot find Document'), true);
      } else {
        promise.resolve();
      };
    };
  });
  return promise;
};

/**
 * @method create
 * @description wraps mongodb create with a promise
 */

exports.Model.prototype.create = function(data) {
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
 * @description searches for a document, otherwise creates it.
 */

exports.Model.prototype.findOrCreate = function(query, document, options) {
  var promise = new Promise()
    , baseModel = this;
  baseModel.findOne(query, function(error, result) {
    if (error) {
      if (error.message && error.message.match(/E11000/i)) {
        promise.reject(new Error('Duplicate Key Error'), true);
      } else {
        promise.reject(error, true);
      };
    } else {
      if (result && result !== null) {
        promise.resolve(result);
      } else {
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
