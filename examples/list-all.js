
/**
 * @example lists all shortened urls in db
 */

var listURLsPromise
  , short = require('../lib/short');

// connect to mongodb
short.connect('mongodb://localhost/short');

short.connection.on('error', function(error) {
  throw new Error(error);
});

// promise to retrieve all shortened URLs
listURLsPromise = short.list();

// output all resulting shortened url db docs
listURLsPromise.then(function(URLsDocument) {
  console.log('>> listing (%d) Shortened URLS:', URLsDocument.length);
  console.log(URLsDocument);
  process.exit(0);
}, function(error) {
  if (error) {
    throw new Error(error);
  }
});
