
/**
 * @list dependencies
 **/

var vows = require('vows')
  , assert = require('assert')
  , mongoose = require('mongoose')
  , short = require('../lib/short');

/**
 * @description connect to mongodb
 **/

var MONGO_DB = 'mongodb://localhost/short';

short.connect(MONGO_DB);

short.connection.on('open', function() {
  console.log('> connected to mongodb');
});

short.connection.on('error', function(error) {
  console.error('> mongodb connection error');
  throw new Error(error);  
});

/**
 * @description add suites to vows
 **/

vows.describe('general module tests').addBatch({

  'when instantiating short':{
    topic:function(){
      return short;
    },
    'short should be an object':function(topic) {
      assert.isObject(topic);
    },
  },

  // creating & retrieving standard item
  'when creating a short url and then retrieving it':{
    topic:function() {
      var self = this;
      short.generate({ URL : 'http://nodejs.org/' }, function(error, URLObject) {
        if (error) {
          self.callback(error, null);
        } else {
          var hash = URLObject.hash;
          short.retrieve(hash, self.callback);
        };
      });
    },
    'there should be no errors':function(error, shortURLObject) {
      assert.isNull(error);
    },
    'shortURL should be defined':function(error, shortURLObject) {
      assert.isNotNull(shortURLObject);
    },
    'shortURL should be an object':function(error, shortURLObject) {
      assert.isObject(shortURLObject);
    },
    'and shortURL.URL should be "http://nodejs.org/"':function(error, shortURLObject) {
      assert.equal(shortURLObject.URL, 'http://nodejs.org/');
    }
  },
  
  // custom data
  'and when there are custom data and options provided':{
    topic:function() {
      var self = this;
      var options = {
        URL  : 'http://nodejs.org/',
        data : {
          string_data : 'test',
          num_data    : 2
        }
      };
      short.generate(options, function(error, URLObject) {
        if (error) {
          self.callback(error, null);
        } else {
          short.retrieve(URLObject.hash, self.callback);
        };
      });
    },
    'there should be no errors':function(error, customDataURL) {
      assert.isNull(error);
    },
    'the custom data should exist':function(error, customDataURL){
      assert.isNotNull(customDataURL.data);
    },
    'the custom data should be an object':function(error, customDataURL) {
      assert.isObject(customDataURL);
    },
    'the custom data.string_data should have a value of "test"':function(error, customDataURL) {
      assert.equal(customDataURL.data.string_data, 'test');
    },
    'the custom data.num_data should have a value of 2':function(error, shortURL) {
      assert.equal(shortURL.data.num_data, 2);
    }
  },

  // .list()
  'when .list()ing Shortened URLs':{
    topic:function() {
      var self = this;
      short.list(self.callback);
    },
    'there should be no errors':function(error, urls) {
      assert.isNull(error);
    },
    'urls should be defined':function(error, urls){
      assert.isNotNull(urls);
    },
    'and urls should be an object':function(error, urls) {
      assert.equal(typeof(urls), 'object');
    }
  }

}).export(module);

/* EOF */