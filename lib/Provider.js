
/*

BKLN?::Provider {}

*/

(function(global, undefined) {
	var counter = 1;
	Provider = function(){};
	Provider.prototype.dummyData = [];
	Provider.prototype.findAll = function(callback) {
	  callback( null, this.dummyData )
	};
	Provider.prototype.findById = function(id, callback) {
	  	var result = null;
	  	for (var i = 0; i < this.dummyData.length; i++) {
	    	if (this.dummyData[i]._id == id) {
	     		result = this.dummyData[i];
	      		break;
	    	}
	  	}
	  	callback(null, result);
	}
	Provider.prototype.save = function(articles, callback) {
	  	var article = null;
	  	if (typeof(articles.length) == "undefined") {
	    	articles = [articles];
	   	}
		for (var i = 0; i < articles.length; i++) {
		    article = articles[i];
		    article._id = counter++;
		    article.created_at = new Date();
		   	if (article.comments === undefined) {
		      	article.comments = [];
			}
		    for (var j =0; j < article.comments.length; j++) {
		      	article.comments[j].created_at = new Date();
		    }
		    this.dummyData[this.dummyData.length] = article;
		}
		callback(null, articles);
	}
	new Provider().save([
	 	{title: 'Post one', body: 'Body one', comments:[{author:'Bob', comment:'I love it'}, {author:'Dave', comment:'This is rubbish!'}]},
		{title: 'Post two', body: 'Body two'},
		{title: 'Post three', body: 'Body three'}
	], function(error, articles){});
	
	if (typeof module !=="undefined" && "exports" in module) {
		module.exports = Provider;
	}
})(global);

/* EOF */