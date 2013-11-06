
# short [![Build Status](https://secure.travis-ci.org/edwardhotchkiss/short.png)](http://travis-ci.org/edwardhotchkiss/short)

> Node.js URL Shortener backed by Mongoose.js

_**No Callbacks, just Promises!**_

## Installation

```bash
$ npm install short
```

***

## Basic API Usage

**Generates a Shortened URL Doc, then retrieves it for demo:**

```javascript
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
```

**Listing all Shortened URLs in DB:**

```javascript
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
```

## Contribute

  1. Fork
  2. Clone forked repository
  3. Add some sweet code
  4. Tests still passing? Run tests with `npm test`
  5. Add a test if adding a feature
  6. Pull Request
  7. **Instant Karma!**

## License (MIT)

Copyright (c) 2011-2013, Edward Hotchkiss.

### Author: [Edward Hotchkiss][0]

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/edwardhotchkiss/short/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

