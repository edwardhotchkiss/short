
var vows = require("vows");
var assert = require("assert");
var should = require("should");
var mongoose = require("mongoose");

var short = require("../lib/short");

short.connect("mongodb://localhost/short");

vows.describe("General Module Tests").addBatch({
  "when instantiating short" : {
    topic : function() { 
      return short;
    },
    "short should be a function" : function(topic) {
      topic.should.be.a("function");
    },
  },
  "when creating and retrieving a short url" : {
    topic : function() {
      var URL = "http://nodejs.org/";
      short.gen(URL, this.callback);
    },
    "there should be no errors" : function(error, shortURL) {
      assert.isNull(error);
    },
    "shortURL should be defined" : function(error, shortURL) {
      assert.isNotNull(shortURL);
    },
    "and shortURL should be an object" : function(error, shortURL) {
      shortURL.should.be.a("object");
    }
  }
}).export(module);

/* EOF */