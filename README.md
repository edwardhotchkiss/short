
# Short [![Build Status](https://secure.travis-ci.org/edwardhotchkiss/short.png)](http://travis-ci.org/edwardhotchkiss/short)

> NodeJS URL Shortener backed by MongooseJS w/ Examples

Notes migrating to 1.0.0+
===============

  NOTE: If you've used any version of Short before 1.0.0, please note the new API. This is a finalized API & with the previous API structure being incompatible with Short 1.0.0+

Running Examples
================

```bash
$ git clone git@github.com:edwardhotchkiss/short.git
$ cd short/examples/basic
$ node api.js
```

Installation
============

```bash
$ npm install short
```

***

Basic API Usage
===============

Using short within your own project as an API interface

```javascript

/*!
  Core Modules
 */

var short = require('short')
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

```

Complete Example with Express
=============================

**Please see** https://github.com/thinkroth/shortUrl

Pull Requests
=============

  * fork
  * clone
  * improve
  * pull request
  * **instant karma!**

Run Tests (git clone)
=====================

``` bash
$ git clone git@github.com:edwardhotchkiss/short.git
$ cd short && npm test
```

License (MIT)
=============

Copyright (c) 2011, Edward Hotchkiss.

### Author: [Edward Hotchkiss][0]
### Contributors: [Kevin Roth][1]

[0]: http://ingklabs.com/
[1]: http://github.com/thinkroth/
