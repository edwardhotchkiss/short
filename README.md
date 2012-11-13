
# short [![Build Status](https://secure.travis-ci.org/edwardhotchkiss/short.png)](http://travis-ci.org/edwardhotchkiss/short)

> Node.JS URL Shortener backed by Mongoose.JS w/ Examples

## Notes migrating to 2.0.0+

  NOTE: Now using `short-id` for valid sha1 hashes

## Running Examples

```bash
$ git clone git@github.com:edwardhotchkiss/short.git
$ cd short/examples/basic
$ node api.js
```

## Installation

```bash
$ npm install short
```

***

## Basic API Usage

Using short within your own project as an API interface

```javascript

/**
 * @list dependencies
 **/

var short = require('short')
  , URL = 'http://nodejs.org/';

/**
 * @description connect to mongodb
 **/

short.connect('mongodb://localhost/short');

short.connection.on('error', function(error){
  throw new Error(error);
});

/**
 * @description generate a shortened URL
 * ... Retrieve URL based on Generated Hash
 **/

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

/**
 * @description Generate a Shortened URL with custom data stored on the hashed URL
 * Retrieve URL based on Generated Hash and retrieve custom data
 * Make sure to use obj.data.toObject() for accessing your custom data
 **/

 var short = require('short')
   , URL = 'http://nodejs.org/',
   , options = {length: 6, data: {'my':'value','is':2}};

short.generate(URL, options, function(error, shortURL) {
  if (error) {
    throw new Error(error);
  } else {
    short.retrieve(shortURL.hash, function(error, shortenedURLObject) {
      if (error) {
        throw new Error(error);
      } else {
        console.log('URL:', shortenedURLObject.URL);
        console.log('hash:', shortenedURLObject.hash);
        console.log('data:', JSON.stringify(shortenedURLObject.data.toObject()));
        process.exit(0);
      }
    });
  }
});

```

## Complete Example with Express

**Please see** https://github.com/thinkroth/shortUrl

## Contribute

  1. Fork
  2. Clone forked repository
  3. Add some sweet code
  4. Tests still passing? Run tests with `npm test`
  5. Add a test if adding a feature
  6. Pull Request
  7. **Instant Karma!**

## License (MIT)

Copyright (c) 2011, Edward Hotchkiss.

### Author: [Edward Hotchkiss][0]

### Contributors: 

[Kevin Roth][1], 
[Chase Brammer][2], 
[Chris Lynch][3], 

[0]: http://edwardhotchkiss.com/
[1]: http://github.com/thinkroth/
[2]: https://github.com/cbrammer/
[3]: https://github.com/lynchseattle/

