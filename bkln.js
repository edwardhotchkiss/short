
/*!
 *
 *
 * bkln.me
 * github/forsurerad/bkln
 *
 *
 */

var sys = require("sys");
var http = require("http");
var express = require("express");
var querystring = require("querystring");
var sqlite = require("node-sqlite");

var app = express.createServer();

var db = new sqlite.Database();

db.open("bkln.db", function (error) {
  	if (error) {
      	console.log("");
      	throw error;
  	};
  	db.execute(
  		"CREATE TABLE IF NOT EXISTS URL",
    	function (error, rows) {
        	if (error) {
        		throw error;
        	} else {
        		console.log("Table `URLs` Created");
        	}
    	}
    );
});

app.configure(function(){
  	//app.use(express.static(__dirname + "/public"));
  	app.use(express.errorHandler());
});

app.get("/", function(request, response) {
	response.send("bkln::index")
});

app.get("/:key", function(request, response) {
	var key = request.param("key");
	console.log("key:"+key);
	if (key == "g") {
		var URL = "http://google.com";
		response.send("", {"Location":URL}, 301);
	}
});

app.listen(3001, "127.0.0.1");

/* EOF */
