
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

short.connect('mongodb://localhost/short');

/*!
  Vows / npm test
 */

vows.describe('general module Tests').addBatch({
  'when instantiating short':{
    topic:function(){
      return short;
    },
    'short should be a function':function(topic) {
      assert.isFunction(topic);
    },
  },
  'when creating and retrieving a short url':{
    topic:function() {
      var URL = 'http://nodejs.org/';
      short.gen(URL, this.callback);
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