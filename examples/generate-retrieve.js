
/**
 * @example generates a shortened url, then fetches it
 * back from mongodb data store
 */

var shortURLPromise
  , short = require('../lib/short');

// connect to mongodb
short.connect('mongodb://localhost/short');

short.connection.on('error', function(error) {
  throw new Error(error);
});

// promise to generate a shortened URL.
var shortURLPromise = short.generate({
  URL : 'http://nodejs.org/'
});

// gets back the short url document, and then retrieves it
shortURLPromise.then(function(mongodbDoc) {
  console.log('>> created short URL:');
  console.log(mongodbDoc);
  console.log('>> retrieving short URL: %s', mongodbDoc.hash);
  short.retrieve(mongodbDoc.hash).then(function(result) {
    console.log('>> retrieve result:');
    console.log(result);
    process.exit(0);
  }, function(error) {
    if (error) {
      throw new Error(error);
    }
  });
}, function(error) {
  if (error) {
    throw new Error(error);
  }
});
