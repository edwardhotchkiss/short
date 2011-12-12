
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
***
