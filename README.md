
short
=====

***Node.js Tiny URL generator with analytics***

**Setup**

```bash
$ npm install short
```
***Integrated***

```javascript
var short = require("short");

var URL = "http://nodejs.org/";

short.save(URL, function(error, hash) {
	if (error) {
		console.error(error);
	} else {
		console.log(hash);
	}
});

short.get(hash, function(error, URL) {
	if (error) {
		console.error(error);
	} else {
		console.log(URL);
	}
});

/* EOF */
```