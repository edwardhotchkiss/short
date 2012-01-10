
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

var short = require('../../lib/short'),
    // URL to Shorten
    URL = 'http://nodejs.org/';

/*!
  Connect to MongoDB w/ MongooseJS
 */

short.connect(MONGO_DB_SHORT);

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
        // URL
        console.log('URL:', shortenedURLObject.URL);
        // Base 62 Hash
        console.log('hash:', shortenedURLObject.hash);
        process.exit(0);
      };
    });
  }
});

```

Complete Example with Express
=============================

```javascript

var url = require('url'),
    express = require('express'),
    short = require('short'),
    app = express.createServer(),
    port = process.env.PORT || 8000,
    ShortURL = short.ShortURL,
    MONGO_DB_SHORT = process.env.MONGO_DB_SHORT || 'mongodb://localhost/short';

/*!
  Connect to MongoDB w/ MongooseJS
 */

short.connect(MONGO_DB_SHORT);

short.connection.on('error', function(error){
  throw new Error(error);
});

/*!
  Setup ExpressJS
 */

app.configure('production', function() {
  app.use(express.static(__dirname+'/public'));
  app.use(express.bodyParser());
});

/*!
  API Calls to Generate Short URLs
 */

app.post('/api/*', function(request, response) {
  if (request.url === '/favicon.ico') {
    return;
  }
  var URL = request.body['url'] || req.url.slice(5),
      options = {length: 5};
  short.generate(URL, options, function(error, shortURL) {
    if (error) {
      console.error(error);
    } else {
      var URL = shortURL.URL;
      var hash = shortURL.hash;
      var tiny_url = 'http://' + request.headers.host + '/' + hash;
      console.log('URL is ' + tiny_url);
      response.send({ url:tiny_url });
    }
  });
});

/*!
  Retrieve Short URLs & Redirect
 */

app.get('*', function(request, response) {
  if (request.url === '/favicon.ico') {
    return;
  }
  var hash = request.url.slice(1),
      visitor = req.connection.remoteAddress,
      options = {visitor: visitor};
  short.retrieve(hash, options, function (error, shortURLObject) {
    if (error) {
      console.error(error);
    } else {
      if (shortURLObject) {
        response.redirect(shortURLObject.URL, 302);
      } else {
        response.send('URL not found!', 404);
        response.end();
      }
    }
  });
});

/*!
  ExpressJS, Listen on <port>
 */

app.listen(port, function() {
  console.log('Server running on port ' + port);
});

```

## Connecting (cURL) to the Complete Example

Just add the domain you'd like to the end of localhost:8080/api

```bash
$ curl localhost:8080/api/http://www.longdomain.com/
```

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
$ cd short
$ npm test
```

License (MIT)
=============

Copyright (c) 2011, Edward Hotchkiss.

### Author: [Edward Hotchkiss][0]
### Contributors: [Kevin][1]

[0]: http://ingklabs.com/
[1]: http://github.com/thinkroth/
