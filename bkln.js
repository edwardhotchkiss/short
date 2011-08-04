
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

db.open("./data/bkln.db", function (error) {
  	if (error) {
      	throw error;
  	} else {
  		db.execute("CREATE TABLE IF NOT EXISTS URLs (id INTEGER PRIMARY KEY, key TEXT UNIQUE, URL TEXT, hits INTEGER);",
    		function (error, rows) {
        		if (error) {
        			throw error;
        		};
    		}
    	);
	};
});

app.configure(function(){
  	app.use(express.static(__dirname + "/public"));
  	app.use(express.errorHandler());
});

app.get("/", function(request, response) {
	response.writeHead(200, { "Content-Type": "text/html" });
	response.write("BKLN.ME");
	response.end();
});

app.get("/urls", function(request, response) {
  	response.writeHead(200, { "Content-Type": "text/html" });
  	db.execute("SELECT * from URLs;",
  		function (error, rows) {
  			if (error) {
  				throw error;
  			} else {
  				response.write("<h1>URLs</h1>\n");
  				response.write("<table>\n");
  				for (var i = 0; i < rows.length; i++) {
  					response.write("<tr>\n");
  					response.write("<td>" + rows[i].id + "</td>\n");
  					response.write("<td>" + rows[i].key + "</td>\n");
  					response.write("<td>" + rows[i].URL + "</td>\n");
  					response.write("<td>" + rows[i].hits + "</td>\n");
  					response.write("</tr>");
  				};
  				response.write("</table>\n");
  				response.end();
  			};
  		}
  	);
});

function updateHits(key) {
	var SQL = "UPDATE URLs SET hits=hits+1 WHERE key == '"+key+"';";
	db.execute(SQL,
		function (error, rows) {
			if (error) {
				throw error;
			};
		}
	);
};

app.get("/:key", function(request, response) {
	var key = request.param("key");
	db.execute("SELECT * from URLs WHERE key == '"+key+"';",
		function (error, rows) {
			if (error) {
				throw error;
			} else {
				if (rows.length === 1) {
					var URL = rows[0].URL;
					updateHits(key);				
					response.send("", {"Location":URL}, 302);
				} else {
					var URL = "http://bkln.me/";
					updateHits("bkln");
					response.send("", {"Location":URL}, 302);
				};
			};
		}
	);
});

app.listen(3000, "127.0.0.1");

/* EOF */
