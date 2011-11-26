
var http = require("http");
var mongoose = require("mongoose");

var short = require("../lib/short");

mongoose.connect("mongodb://localhost/short");

var app = http.createServer(function(request, response) {
  console.log(short);
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
  app.listen(8080);
  console.log("> Open "+finalURL);
});

/* EOF */