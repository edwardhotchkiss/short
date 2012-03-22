
/**
 * requires
 */

var vows = require('vows')
  , assert = require('assert')
  , mongoose = require('mongoose')
  , short = require('../lib/short');

/**
 * connect to mongodb
 */

var MONGO_DB = process.env.MONGO_DB || 'mongodb://localhost/short';

short.connect(MONGO_DB);

short.connection.on('error', function(error) {
  throw new Error(error);  
});

/**
 * add suites to vows
 */

vows.describe('general module tests').addBatch({

  // core
  'when instantiating short':{
    topic:function(){
      return short;
    },
    'short should be an object':function(topic) {
      assert.isObject(topic);
    },
  },

  // hasher
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

  // creating & retrieving standard item
  'when creating a short url and then retrieving it':{
    topic:function() {
      var self = this;
      var URL = 'http://nodejs.org/';
      short.generate(URL, function(error, URLObject) {
        if (error) {
          self.callback(error, null);
        } else {
          short.retrieve(URLObject.hash, self.callback);
        };
      });
    },
    'there should be no errors':function(error, shortURL){
      assert.isNull(error);
    },
    'shortURL should be defined':function(error, shortURL){
      assert.isNotNull(shortURL);
    },
    'shortURL should be an object':function(error, shortURL){
      assert.isObject(shortURL);
    },
    'and shortURL.URL should be "http://nodejs.org/"':function(error, shortURL){
      assert.equal(shortURL.URL, 'http://nodejs.org/');
    },
    'and when there are custom data and options provided':{
      topic:function() {
        var self = this;
        var URL = 'http://nodejs.org/';
        var customData = {string_data:'test', num_data:2};
        short.generate(URL, {length:5, data:customData}, function(error, URLObject) {
          if (error) {
            self.callback(error, null);
          } else {
            short.retrieve(URLObject.hash, self.callback);
          };
        });
      },
      'there should be no errors':function(error, customDataURL){
        assert.isNull(error);
      },
      'the hashed URL should be 5 characters long':function(error, shortURL){
        assert.strictEqual(shortURL.hash.length, 5);
      },
      'the custom data should exist':function(error, shortURL){
        assert.isNotNull(shortURL.data.toObject());
      },
      'the custom data should be an object':function(error, shortURL){
        assert.isObject(shortURL.data.toObject());
      },
      'the custom data.string_data should have a value of "test"':function(error, shortURL){
        assert.equal(shortURL.data.toObject().string_data, 'test');
      },
      'the custom data.num_data should have a value of 2':function(error, shortURL){
        assert.equal(shortURL.data.toObject().num_data, 2);
      }
    }
  },

  // .list()
  'when `.list()ing Shortened URLs':{
    topic:function() {
      var self = this;
      short.list(self.callback);
    },
    'there should be no errors':function(error, urls){
      assert.isNull(error);
    },
    'urls should be defined':function(error, urls){
      assert.isNotNull(urls);
    },
    'and urls should be an object':function(error, urls){
      assert.equal(typeof(urls), 'object');
    }
  }

}).export(module);

/* EOF */