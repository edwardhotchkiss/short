
/*!
  Core Modules
 */

var short = require('../../lib/short')
  , URL = 'http://nodejs.org/';

short.connect('mongodb://localhost/short');

short.connection.on('error', function(error){
  throw new Error(error);
});

/*!
  Generate a Shortened URL
  Retrieve URL based on Generated Hash
 */

short.generate(URL, function(error, shortURL) {
  if (error) {
    throw new Error(error);
  } else {
    short.retrieve(shortURL.hash, function(error, shortenedURLObject) {
      if (error) {
        throw new Error(error);
      } else {
        console.log('URL:', shortenedURLObject.URL);
        console.log('hash:', shortenedURLObject.hash);
        process.exit(0);
      }
    });
  }
});

/* EOF */