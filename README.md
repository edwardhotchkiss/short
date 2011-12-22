
# short [![Build Status](https://secure.travis-ci.org/edwardhotchkiss/short.png)](http://travis-ci.org/edwardhotchkiss/short)

> NodeJS URL Shortener backed by MongooseJS

### Installation

```bash
$ npm install short
$ cd short
$ npm install
$ node examples/server.js
```
***

### Basic API Usage

```javascript
var short = require("short");

short.connect("mongodb://localhost/short");

var URL = "http://nodejs.org/";

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
```
***

### HTTP Server & API

```javascript
var http = require("http");

var short = require("short");

short.connect("mongodb://localhost/short");

var app = http.createServer(function(request, response) {
  var hash = request.url.slice(1);
  short.get(hash, function(error, shortURLObject) {
    if (shortURLObject) {
      var URL = shortURLObject[0].URL;
      response.writeHead(302, {
        "Location" : URL
      });
      response.end();
    } else {
      response.writeHead(200, { "Content-Type" : "text/html" });
      response.write("URL not found!");
      response.end();
    }
  });
});

short.gen("http://nodejs.org/", function(error, shortURL) {
  finalURL = "http://localhost:8000/" + shortURL.hash;
  app.listen(8000);
  console.log("> Open "+finalURL);
});
```
***

### Express Server & API
```javascript
var url = require('url'),
    express = require('express'),
    short = require('short'),
    app = express.createServer(),
    port = process.env.PORT || 8080;

short.connect("mongodb://localhost/short");

app.get('/api/*', function (req, res) {
  if (req.url === '/favicon.ico') {
    return;
  }
  var removeApi = req.url.slice(5),
      URL = removeApi;
  short.gen(URL, function (error, shortURL) {
    if (error) {
      console.error(error);
    } 
    else {
      var URL = shortURL.URL;
      var hash = shortURL.hash;
      var tiny_url = "http://127.0.0.1:" + port + "/" + hash;
      console.log("URL is " + URL + " " + tiny_url);
      res.end(tiny_url);
    }
  });
});

app.get('*', function (req, res) {
  if (req.url === '/favicon.ico') {
    return;
  }
  var hash = req.url.slice(1);
  short.get(hash, function (error, shortURLObject) {
    if (error) {console.error(error);
    } 
    else {
      if (shortURLObject) {
        res.redirect(shortURLObject[0].URL);
      } 
      else {
        res.send('URL not found!', 404);
        res.end();
      }
    }
  });
});

app.listen(port, function () {
  console.log('Server running on port ' + port);
});

```

## Run Tests

``` bash
$ npm test
```

## License (MIT)

Copyright (c) 2011, Edward Hotchkiss.

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Author: [Edward Hotchkiss][0]
## Contributors: [Kevin][1]

[0]: http://ingklabs.com/
[1]: http://github.com/thinkroth/
