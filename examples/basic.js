
var mongoose = require("mongoose");
var short = require("../");

mongoose.connect("mongodb://localhost/short");

var URL = "http://nodejs.org/";

short.save(URL, function(error, hash) {
	/*if (error) {
		console.error(error);
	} else {
		short.get(hash, function(error, URL) {
			if (error) {
				console.error(error);
			} else {
				console.log(URL, hash);
			}
		});
	}*/
});

/* EOF */