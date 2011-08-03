
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

var app = require("express").createServer();

app.configure(function(){
  	//app.use(express.static(__dirname + "/public"));
  	app.use(express.errorHandler());
});

app.get("/", function(request, response) {
	response.send("bkln:index")
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
