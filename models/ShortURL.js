
/*
 *
 * Model::ShortURL
 *
 */

var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var ShortURL_Schema = {
	id          : { type : ObjectId },
	URL        	: { type : String },
	hash        : { type : String },
	hits        : { type : Number, default: 0 },
	created_at  : { type : Date, default: Date.now }
};

var ShortURLSchema = new Schema(ShortURL_Schema);
var ShortURL = mongoose.model("ShortURL", ShortURLSchema);

ShortURL.findByHash = function(hash, callback) {
	ShortURL.find({ hash: hash }, function(error, URL) {
		if (error) {
			callback(error, null);
		} else {
			var id = URL[0]._id;
			short.updateHitsById(id, function(error) {
				if (error) {
					callback(error, null);
				} else {
					callback(null, URL);
				};
			});
		};
	}); 
};

ShortURL.updateHitsById = function(id, callback) {
	ShortURL.findById(id, function (error, URL) {
		var hits = URL.hits + 1;
	    if (!error) {
		  	URL.hits = hits;
		  	URL.save(function(error) {
		    	callback(error);
		  	});
		}
	});
};

module.exports = {
	ShortURL_Schema : ShortURL_Schema,
	ShortURLSchema : ShortURLSchema,
	ShortURL : ShortURL
};

/* EOF */