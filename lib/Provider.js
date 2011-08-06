
/*

BKLN?::Provider {}

*/

(function(global, undefined) {
	var counter = 1;
	Provider = function(){};
	Provider.prototype.Data = [];
	Provider.prototype.findAll = function(callback) {
	  	callback(null, this.Data);
	};
	Provider.prototype.findById = function(id, callback) {
	  	var result = null;
	  	for (var i = 0; i < this.Data.length; i++) {
	    	if (this.Data[i]._id == id) {
	     		result = this.Data[i];
	      		break;
	    	}
	  	}
	  	callback(null, result);
	}
	Provider.prototype.save = function(urls, callback) {
	  	var url = null;
	  	if (typeof(urls.length) == "undefined") {
	    	urls = [urls];
	   	}
		for (var i = 0; i < urls.length; i++) {
		    url = urls[i];
		    url._id = counter++;
		    url.created_at = new Date();
		    this.Data[this.Data.length] = url;
		}
		callback(null, urls);
	}
	new Provider().save([
	 	{ url : "http://google.com/" },
	 	{ url : "http://facebook.com/" }
	], function(error, articles){});
	
	if (typeof module !=="undefined" && "exports" in module) {
		module.exports = Provider;
	}
})(global);

/* EOF */