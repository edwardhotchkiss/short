
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
var mongodb = require("node-mongodb-native/lib/mongodb");
var Provider = require("./lib/Provider.js");

var app = express.createServer();

var DB = new mongodb.Db("bkln", new mongodb.Server("50.57.122.105", 27017, {}), {});

DB.addListener("error", function(error) {
 	throw error;
});

app.configure(function() {
  	app.use(express.static(__dirname + "/public"));
  	app.set("views", __dirname + "/views");
  	app.set("view engine", "ejs");
  	app.use(express.bodyParser());
  	app.use(express.errorHandler());
});

app.configure("development", function() {
  	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure("production", function() {
  	app.use(express.errorHandler());
});

var URLProvider = new Provider();

app.get("/", function(request, response) {
	response.render("index", {
		locals:{}
	});
});

app.get("/urls", function(request, response) {
  	URLProvider.findAll(function(error, docs) {
      	response.send(docs);
 	});
});

app.post("/create", function(request, response) {
	URLProvider.save({
        url: request.param("url")
    }, function(error, docs) {
    	responseData = {
    		shortened : "http://bkln.me/XXXX?/"
    	}
    	response.writeHead(200, { "Content-Type": "text/json" });
        response.write(JSON.stringify(responseData));
        response.end();
    });
});

app.listen(80, "127.0.0.1");

/* EOF */
