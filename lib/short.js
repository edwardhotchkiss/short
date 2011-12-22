
var mongoose = require('mongoose'),
    base = require('base-converter'),
    ShortURL = require(__dirname+'/../models/ShortURL.js');

function hasher(URL) {
  // generates a 3 to 7 digit number
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

  var item = new ShortURL({
    URL : URL,
    hash : hashedURL
  });
  item.save(function (error, item) {
    //Tries to save to mongodb, if it exists it retries
    if (error && error.code === 11000) {
      console.log(hashedURL + " already exists! Retrying!");
      short.gen(URL, callback);
    } else {
      callback(null, item);
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