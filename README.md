
# short [![Build Status](https://secure.travis-ci.org/edwardhotchkiss/short.png)](http://travis-ci.org/edwardhotchkiss/short)

> Node.JS URL Shortener backed by Mongoose.JS w/ Examples

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

var short = require('short');

/**
 * @description connect to mongodb
 **/

short.connect('mongodb://localhost/short');

short.connection.on('error', function(error) {
  throw new Error(error);
});

/**
 * @description generate a shortened URL.
 * then retrieve URL based on Generated Hash
 **/

var options = {
  URL : 'http://nodejs.org/',
};

short.generate(options, function(error, shortURL) {
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
 * @description Generate a Shortened URL with custom data stored along with hashed URL
 * Next, Retrieve URL based on Generated Hash and retrieve custom data
 * Make sure to use obj.data.toObject() for accessing your custom data
 **/

var short = require('short')

var options = {
  URL  : 'http://nodejs.org/',
  data : {
    string_data : 'test',
    num_data    : 2
  }
};

short.generate(options, function(error, shortURL) {
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

