
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
var guid = require("short").guid;

var URL = "http://twitter.com/kisshotch/";
var GUID = guid(URL);

// w/ callback, just for show
short.save(URL, GUID, function(error) {
	if (error) {
		console.error(error);
	}
});
```