
// core
var mongoose = require("mongoose");
var base = require("base-converter");

var ShortURL = require(__dirname + "/../models/ShortURL.js");

// setup base62 hash
function hesher(URL) {
  var id = Math.floor(Math.random() * (100000 - 9999999 + 1) + 9999999);
  var hash = base.decTo62(id);
  return hash;
};

var short = function(){};

short.connect = function(mongodb) {
  mongoose.connect(mongodb);
};

// if it exists, use pre-existing
short.gen = function(URL, callback) {
  var hashedURL = hesher(URL);
  ShortURL.checkExists(hashedURL, function(error, shortenedURLs) {
    if (error) {
      callback(error, null);
    } else {
      if (shortenedURLs.length === 0) {
        var item = new ShortURL({
          URL : URL,
          hash : hashedURL
        });
        item.save(function(error, item) {
          if (error) {
            callback(error, null);
          } else {
            callback(null, item); 
          };
        });
      } else {
        short.gen(URL, callback);
      }
    }
  });
};

short.get = function(hash, callback) {
  ShortURL.findByHash(hash, function(error, URL) {
    if (error) {
      callback(error, null);
    } else {
      callback(null, URL);
    };
  });
};

module.exports = short;

/* EOF */