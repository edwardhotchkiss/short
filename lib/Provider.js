
/*

BKLN?::Provider {}

*/

(function(global, undefined) {
	var mongo = require("node-mongodb-native/lib/mongodb");
	var DB = mongo.Db;
	var connection = mongo.Connection;
	var server = mongo.Server;
	var BSON = mongo.BSON;
	var ObjectID = mongo.ObjectID;
	Provider = function(host, port) {
	  	this.db = new DB("BKLN", new server(host, port, {auto_reconnect: true}, {}));
	  	this.db.open(function(){});
	};
	Provider.prototype.getCollection = function(callback) {
	  	this.db.collection("urls", function(error, url_collection) {
	    	if (error) {
	    		callback(error);
	    	} else {
	    		callback(null, url_collection);
	    	}
	  	});
	};
	Provider.prototype.findAll = function(callback) {
	    this.getCollection(function(error, url_collection) {
	      	if (error) {
	      		callback(error);
	      	} else {
	        	url_collection.find().toArray(function(error, results) {
	          		if (error) {
	          			callback(error);
	          		} else {
	          			callback(null, results);
	          		}
	        	});
	      	}
	    });
	};
	Provider.prototype.findById = function(id, callback) {
	    this.getCollection(function(error, url_collection) {
		 	if (error) {
		 		callback(error);
		 	} else {
	        	url_collection.findOne({_id: url_collection.db.bson_serializer.ObjectID.createFromHexString(id)}, function(error, result) {
	          		if (error) {
	          			callback(error);
	          		} else {
	          			callback(null, result);
	          		}
	        	});
	      	}
	    });
	};
	Provider.prototype.findByHash = function(hash, callback) {
	    this.getCollection(function(error, url_collection) {
		 	if (error) {
		 		callback(error);
		 	} else {
	        	url_collection.findOne({hash: hash}, function(error, result) {
	          		if (error) {
	          			callback(error);
	          		} else {
	          			url_collection.update({_id: result._id}, {'$inc': {hits: 1}}, {}, function(error) {
	          				if (error) {
	          					throw err;
	          				}
	          			});
	          			callback(null, result);
	          		}
	        	});
	      	}
	    });
	};
	Provider.prototype.save = function(urls, callback) {
	    this.getCollection(function(error, url_collection) {
	      	if (error) {
	      		callback(error);
	      	} else {
	        	if (typeof(urls.length) == "undefined") {
	          		urls = [urls];
				}
	        	for (var i = 0; i < urls.length; i++) {
	          		url = urls[i];
	          		url.hits = 0;
	          		url.created_at = new Date();
	          		url.hash = makeGUID(4);
	        	}
	        	url_collection.insert(urls, function() {
	          		callback(null, urls);
	        	});
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