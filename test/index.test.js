
/**
 * @list dependencies
 **/

var vows = require('vows')
  , assert = require('assert')
  , mongoose = require('mongoose')
  , short = require('../lib/short');

/**
 * @description Log outbound, Connect to mongodb
 **/

mongoose.set('debug', true);

short.connect('mongodb://localhost/short');

var generatePromise = short.generate({ URL : 'http://edwardhotchkiss.com/' });
generatePromise.then(function(ShortURLObject) {
  console.log(ShortURLObject);
}, function(error) {
  throw new Error(require('util').inspect(error));
});

/* EOF */