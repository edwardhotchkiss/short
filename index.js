
/*!
 *
 *
 * bkln.me
 * github/forsurerad/bkln
 *
 *
 */

var express = require("express");
var app = express.createServer();

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

var Provider = require("./lib/Provider.js");
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
	}, function(error, URL) {
		var hash = URL.hash;
		var shortened = "http://bkln.me/" + hash;
		responseData = {
			shortened : shortened
		}
		response.writeHead(200, { "Content-Type": "text/json" });
		response.write(JSON.stringify(responseData));
		response.end();
	});
});

app.get("/:hash", function(request, response) {
    URLProvider.findByHash(request.params.hash, function(error, url) {
    	if (url) {
    		var URL = url.url;
    		response.send("", {"Location":URL}, 301);
    	} else {
    		var URL = "http://bkln.me/";
    		response.send("", {"Location":URL}, 301);
    	}
    });
});

app.listen(80, "127.0.0.1");

/* EOF */
