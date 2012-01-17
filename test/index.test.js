
/*!
  requires
 */

var vows = require('vows'),
    assert = require('assert'),
    mongoose = require('mongoose'),
    short = require('../lib/short');

/*!
  connect to mongodb
 */

var MONGO_DB = process.env.MONGO_DB || 'mongodb://localhost/short';

short.connect(MONGO_DB);

short.connection.on('open', function() {
  console.log('connected to mongodb');  
});

short.connection.on('error', function(error) {
  throw new Error(error);  
});

/*!
  add suites to vows
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
  'when hashing `http://google.com/`':{
    topic:function(){
      return short.hasher('http://google.com/');
    },
    'the hash should be a string':function(hash){
      assert.isString(hash);
    },
    'with a length of 6':function(hash){
      assert.strictEqual(hash.length, 6);
    }
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