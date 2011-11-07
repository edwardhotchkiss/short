
short
=====

***Node.js Tiny URL generator with analytics***

**Setup**

```bash
$ npm install short
```
***Basic API Usage***

```javascript
var mongoose = require("mongoose");
var short = require("short")("mongodb://localhost/short");

var URL = "http://nodejs.org/";

short.gen(URL, function(error, shortURL) {
	if (error) {
		console.error(error);
	} else {
		short.get(shortURL.hash, function(error, shortURLObject) {
			if (error) {
				console.error(error);
			} else {
				var URL = shortURLObject[0].URL
				var hash = shortURLObject[0].hash;
				console.log(URL, hash);
			};
		});
	}
});

/* EOF */
```

***As a Server***

```javascript
var http = require("http");
var mongoose = require("mongoose");
var short = require("short")("mongodb://localhost/short");

var app = http.createServer(function(request, response) {
	var hash = request.url.slice(1);
	if (request.url === "/") {
		response.writeHead(200, { "Content-Type" : "text/html" });
  		response.write("URL not found!");
  		response.end();
	} else {
		short.get(hash, function(error, shortURLObject) {
			if (error) {
				console.error(error);
			} else {
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
			};
		});
	}
});

app.listen(8080);
console.log("> Open http://localhost:8080/kQ4c");

/* EOF */
```