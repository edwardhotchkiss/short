
var mongoose = require("mongoose");

var short = function(){};

short.find = function(hash, callback) {
	ShortURL.findByHash(hash, function(error, URL) {
		if (error) {
			callback(error, null);
		} else {
			callback(null, URL);
		};
	});
};

module.exports = short;

/* EOF */