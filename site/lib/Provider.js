
/*

Provider(){}
mongoose goodness.

*/

(function(global, undefined) {
	var mongoose = require("mongoose");
	mongoose.connect("mongodb://50.57.122.105/BKLN");
	var schema = mongoose.Schema;
	var ObjectId = schema.ObjectId;
	var URL = new schema({
	    id          : ObjectId,
	    URL        	: String,
  	    hash        : String,
	  	hits        : { type: Number, default: 0 },
	    created_at  : { type: Date, default: Date.now }
	});
	mongoose.model("URL", URL);
	var URL = mongoose.model("URL");
	Provider = function(){};
	Provider.prototype.findAll = function(callback) {
	  	URL.find({}, function(error, URLs) {
	    	callback(null, URLs);
	  	});  
	};
	Provider.prototype.findById = function(id, callback) {
	  	URL.findById(id, function (error, URL) {
	    	if (!error) {
		  		callback(null, URL);
			}
	  	});
	};
	Provider.prototype.findByHash = function(hash, callback) {
		URL.find({ hash: hash }, function(error, URL) {
			if (!error) {
				callback(null, URL);
			}
		}); 
	};	
	Provider.prototype.updateHitsById = function(id, callback) {
	  	URL.findById(id, function (error, URL) {
	  		var hits = URL.hits + 1;
	    	if (!error) {
		  		URL.hits = hits;
		  		URL.save(function(error) {
		    		callback(error);
		  		});
			}
	  	});
	};
	Provider.prototype.save = function(params, callback) {
		var GUID = makeGUID(4);
	  	var newURL = new URL({
	  		URL: params.url,
	  		hash: GUID
	  	});
	 	newURL.save(function(error) {
	 		if (!error) {
	 			callback(error, newURL);
	  		}
	  	});
	};
	function makeGUID(len) {
		len = len || 6;
	    var GUID = "";
	    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	    for (var i = 0; i < len; i++) {
	        GUID += chars.charAt(Math.floor(Math.random() * chars.length));
		}
	    return GUID;
	}
	if (typeof module !=="undefined" && "exports" in module) {
		module.exports = Provider;
	}
})(global);

/* EOF */