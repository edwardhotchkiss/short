
var app = require("../index.js");
var assert = require("assert");

module.exports = {
  	"GET /": function() {
    	assert.response(
    		app,
      		{ url: "/" },
      		{ status: 200, headers: { "Content-Type": "text/html; charset=utf-8" }},
      	function(response) {
        	assert.includes(response.body, "<title>Express</title>");
      	});
  	}
};