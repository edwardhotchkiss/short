
// core
var mongoose = require("mongoose");
var base = require("base-converter");

var ShortURL = require("../models/ShortURL.js");

function hesher(URL) {
	var id = Math.floor(Math.random() * (100000 - 9999999 + 1) + 9999999);
	var hash = base.decTo62(id);
	return hash;
};

var short = function(){};

// if it exists, use pre-existing
short.make = function(URL, callback) {
	var hashedURL = hesher(URL);
	ShortURL.checkExists(hashedURL, function(error, shortenedURLs) {
		if (error) {
			callback(error, null);
		} else {
			if (shortenedURLs.length === 0) {
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
				callback(null, shortenedURLs[0]);
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

/* EOF */