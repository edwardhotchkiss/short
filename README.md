
short
=====

***Node.js Tiny URL generator with analytics***

**Setup**

```bash
$ npm install short
```
***Integrated***

```javascript
var mongoose = require("mongoose");
var short = require("short");

mongoose.connect("mongodb://localhost/short");

var URL = "http://nodejs.org/";

short.make(URL, function(error, shortURL) {
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
				process.exit(1);
			}
		});
	}
});

/* EOF */
```