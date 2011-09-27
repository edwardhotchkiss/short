
(function(global, undefined) {
	var mongoose = require("mongoose");
	var base = require("base-converter");
	var shortURL = require("../models/ShortURL.js");
	function hesher(URL) {
		var id = Math.floor(Math.random() * (100000 - 999000 + 1) + 999000);
		var hash = base.decTo36(id);
		return hash;
	};
	var short = function(){};
	short.make = function(URL, callback) {
		var hashedURL = hesher(URL);
		var shortURLItem = new shortURL.ShortURL({
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
	};
	short.get = function(hash, callback) {
		shortURL.ShortURL.findByHash(hash, function(error, URL) {
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