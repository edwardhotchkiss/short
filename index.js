
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

var db = new mongodb.Db("bkln", new mongodb.Server("50.57.122.105", 27017, {}), {});

db.addListener("error", function(error) {
 	throw error;
});

db.open(function(p_db) {
	db.createCollection("URLs", function(error, collection) {
		if (error) {
			throw error;
		}
		collection.ensureIndex([["URL", 1]], true, function(error) {
			if (error) {
				throw error;
			}
		});
		collection.ensureIndex([["key", 1]], true, function(error) {
			if (error) {
				throw error;
			}
		});
		collection.count(function(error, count) {
			if (error) {
				console.log("collection count: "+count);
				throw error;
			}
		});
		app.set("collection", collection);
	});
});

app.configure(function() {
	app.use(express.methodOverride());
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

app.get("/urls", function(request, response) {
  	URLProvider.findAll(function(error, docs) {
      	response.send(docs);
 	});
});

app.listen(3000, "127.0.0.1");

/* EOF */
