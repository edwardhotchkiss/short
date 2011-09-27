
(function(global, undefined) {
	var mongoose = require("mongoose");
	var base = require("base-converter");
	var ShortURL = require("../models/ShortURL");
	function hash(URL) {
		var id = Math.floor(Math.random() * (100000 - 999000 + 1) + 999000);
		console.log(id);
		var hash = base.decTo36(id);
		console.log(URL, hash);
	};
	var short = function(){};
	short.save = function(URL, callback) {
		var hashedURL = hash(URL);
		var shortURLItem = new ShortURL({
			URL : URL,
			hash : hashedURL
		});
		shortURLItem.save(function(error, result) {
			if (error) {
				callback(error, null);
			} else {
				callback(null, result);	
			};
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