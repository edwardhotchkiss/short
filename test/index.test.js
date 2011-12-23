
/*!
  Core Modules
 */

var vows = require('vows'),
    assert = require('assert'),
    mongoose = require('mongoose'),
    short = require('../lib/short');

/*!
  Connect to MongoDB
 */

var MONGO_DB = process.env.MONGO_DB || 'mongodb://localhost/short';

short.connect(MONGO_DB);

/*!
  Vows / npm test
 */

vows.describe('general module tests').addBatch({
  'when instantiating short':{
    topic:function(){
      return short;
    },
    'short should be an object':function(topic) {
      assert.isObject(topic);
    },
  },
  'when creating and retrieving a short url':{
    topic:function() {
      var URL = 'http://nodejs.org/';
      short.generate(URL, this.callback);
    },
    'there should be no errors':function(error, shortURL){
      assert.isNull(error);
    },
    'shortURL should be defined':function(error, shortURL){
      assert.isNotNull(shortURL);
    },
    'and shortURL should be an object':function(error, shortURL){
      assert.isObject(shortURL);
    }
  }
}).export(module);

/* EOF */