
var mongoose = require("mongoose"),
    base = require("base-converter"),
    ShortURL = require(__dirname + "/../models/ShortURL.js");

function hasher(URL) {
  //Generates a 3 to 7 digit number
  var id = Math.floor(Math.random() * 3500000000000) + 3845,
      hash = base.decTo62(id);
  return hash;
}

module.exports = short = function () {};

short.connect = function (mongodb) {
  mongoose.connect(mongodb);
};

short.gen = function (URL, callback) {
  var hashedURL = hasher(URL);
  ShortURL.checkExists(hashedURL, function (error, shortenedURLs) {
    if (error) {
      callback(error, null);
    } else {
      if (shortenedURLs.length === 0) {
        var item = new ShortURL({
          URL : URL,
          hash : hashedURL
        });
        item.save(function (error, item) {
          if (error) {
            callback(error, null);
          } else {
            callback(null, item); 
          }
        });
      } else {
        short.gen(URL, callback);
      }
    }
  });
};

short.get = function (hash, callback) {
  ShortURL.findByHash(hash, function (error, URL) {
    if (error) {
      callback(error, null);
    } else {
      callback(null, URL);
    }
  });
};

/* EOF */