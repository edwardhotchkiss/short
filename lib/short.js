
(function(global, undefined) {
	var mongoose = require("mongoose");
	var base = require("base-converter");
	var ShortURL = require("../models/ShortURL.js").ShortURL;
	function hesher(URL) {
		var id = Math.floor(Math.random() * (100000 - 9999999 + 1) + 9999999);
		var hash = base.decTo62(id);
		return hash;
	};
	var short = function(){};
	short.make = function(URL, callback) {
		var hashedURL = hesher(URL);
		ShortURL.checkExists(hashedURL, function(error, count) {
			if (error) {
				callback(error, null);
			} else {
				if (count === 0) {
					var shortURLItem = new ShortURL({
						URL : URL,
						hash : hashedURL
					});
					shortURLItem.save(function(error, item) {
						if (error) {
							callback(error, null);
						} else {
							callback(null, item);	
						};
					});
				} else {
					console.log("taken ...");
					short.make(URL, callback);
				}
			}
		});
	};
	short.get = function(hash, callback) {
		ShortURL.findByHash(hash, function(error, URL) {
			if (error) {
				callback(error, null);
			} else {
				callback(null, URL);
			};
		});
	};
	module.exports = short;
})(global);

/* EOF */