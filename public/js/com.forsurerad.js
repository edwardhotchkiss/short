
/*

com.forsurerad.js

*/	

/*
FSR global namespace
@namespace FSR
@param {String} ns_string Desired NameSpace
@returns FSR namespace
*/

var FSR = FSR || {};

window.FSR = FSR;

FSR.namespace = function(ns_string) {
	var parts = ns_string.split(".");
	var parent = FSR;
	var i;
	if (parts[0] === "FSR") {
		parts = parts.slice(1);
	}
	for (i = 0; i < parts.length; i += 1) {
		if (typeof parent[parts[i]] === "undefined") {
			parent[parts[i]] = {};
		}	
		parent = parent[parts[i]];
	}
	return parent;
};

/*
validate a URL
*/

FSR.isUrl = function(url) {
	var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
	return regexp.test(url);
}

/*
Movement specific to FSR
@namespace FSR.movement
@params void(0)
@return void(0)	
*/

$("#send").click(function() {	
	if (!FSR.isUrl($("#url").val())) {
		alert("Invalid URL!");
		return false;
	};
	var postData = {};
	postData.url = $("#url").val();
	var returnCall = function(response) {
		setTimeout(function() {
			$("#url").val(response.shortened);
		}, 1000);	
	};
	$("#send").val("shortening");
	FSR.ajaxer("/create", postData, returnCall);
});

/*
AJAX Wrapper
@namespace FSR.ajaxer
@params {String} URL URL to POST to
@params {Object} postData Data to send via POST
@params {function} returnCall call to execute upon success
@return void(0)
*/

FSR.namespace("FSR.ajaxer");

FSR.ajaxer = function(URL, postData, returnCall) {
	$("body").append('<div id="indicator"></div>');
	$("#indicator").css({
	  	display: "none",
	  	position: "absolute",
	  	top: "40%",
	  	left : "50%",
	  	marginLeft : "-69px",
	  	opacity : 0.5,
	  	paddingTop : "",
	  	paddingLeft : "",
		width : "94px",
 		height : "94px", 
	  	backgroundColor : "#a8a8a8",
		borderRadius : 7,
	   	zIndex : 100000
	});	
	$("#indicator").html('<img src="/images/ajax-loader.gif" />');
	$("#indicator img").css({
		display : "block",
		marginTop : "30px",
		marginLeft : "30px"
	});
	$(document).ajaxStart(function() {
	  	$("#indicator").fadeIn(500);
	}).ajaxStop(function() {
	  	$("#indicator").fadeOut(500);
	});
	$.ajax({
	 	type : "post",
	 	data : postData,
		url : URL,
	  	cache : false,
	  	dataType : "json",
	   	success : function(response) {
		   	returnCall(response);
	   	}
	});
};

/* EOF */