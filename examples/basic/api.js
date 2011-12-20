
/*!
  Core Modules
 */

var short = require('../lib/short'),
    URL = 'http://nodejs.org/';

short.connect('mongodb://localhost/short');

short.gen(URL, function(error, shortURL) {
  if (error) {
    throw new Error(error);
  } else {
    short.get(shortURL.hash, function(error, shortURLObject) {
      if (error) {
        throw new Error(error);
      } else {
        var URL = shortURLObject[0].URL
        var hash = shortURLObject[0].hash;
        process.exit(1);
      };
    });
  }
});

/* EOF */