
# short

***

## NodeJS Tiny URL API

***

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
var mongoose = require("mongoose");
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
var mongoose = require("mongoose");

var short = require("short");

mongoose.connect("mongodb://localhost/short");

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