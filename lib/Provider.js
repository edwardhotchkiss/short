
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
		    url.hash = makeGUID(4);
		}
		callback(null, urls);
	}
	new Provider().save([
	 	{ url : "http://google.com/" },
	 	{ url : "http://facebook.com/" }
	], function(error, urls){
		// callback
	});
	
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