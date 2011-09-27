
/*
 *
 * Model::short
 *
 */

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

function GUID(URL) {
	var CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	var GUID = "";
	for (var i = 0; i < 6; i++) {
	  	GUID += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
	};
	return GUID;
};

var short_schema = {
	id          : ObjectId,
	URL        	: String,
	hash        : { type : String },
	hits        : { type : Number, default: 0 },
	created_at  : { type : Date, default: Date.now }
};

var ShortSchema = new Schema(short_schema);
var Short = mongoose.model("Short", ShortSchema);

Short.updateHitsById = function(id, callback) {
	Short.findById(id, function (error, URL) {
		var hits = URL.hits + 1;
	    if (!error) {
		  	URL.hits = hits;
		  	URL.save(function(error) {
		    	callback(error);
		  	});
		}
	});
};

Short.findByHash = function(hash, callback) {
	Short.find({ hash: hash }, function(error, URL) {
		if (error) {
			callback(error, null);
		} else {
			var id = URL[0]._id;
			Short.updateHitsById(id, function(error) {
				if (error) {
					console.error(error);
				}
			});
			callback(null, URL);
		};
	}); 
};

module.exports = {
	short_schema : short_schema,
	ShortSchema : ShortSchema,
	Short : Short
};

/* EOF */