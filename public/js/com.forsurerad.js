
/*
com.forsurerad.js
version 0.1.0
First Created: 04/22/2011
Last Revised: 04/27/2011
http://forsurerad.com/
hi@forsurerad.com
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
	var parts = ns_string.split('.');
	var parent = FSR;
	var i;
	if (parts[0] === 'FSR') {
		parts = parts.slice(1);
	}
	for (i = 0; i < parts.length; i += 1) {
		if (typeof parent[parts[i]] === 'undefined') {
			parent[parts[i]] = {};
		}	
		parent = parent[parts[i]];
	}
	return parent;
};

FSR.init = function() {
	FSR.loaded = false;
}

$(document).ready(function() {
	FSR.init();
});

/*
Classical Inheretence
@namespace FSR.utils.inheret
@param {Object} C Child Object
@param {Object} P Parent Object
@returns void(0)
*/

FSR.namespace('FSR.utils');

FSR.utils = {
	inherit : function(C, P) {
		var F = function() {};
		F.prototype = P.prototype;
		C.prototype = new F();
		C.uber = P.prototype;
		C.prototype.constructor = C;
	}
}

/*
Determine current HTML5 Address State
-- /#/ Hash fallback
@namespace FSR.address.init
@returns {Boolean}
*/

FSR.namespace('FSR.address');

FSR.address = {	
	__construct : function() {
		
		$(document).ready(function() {
			$('#menu li:first').click(function() { FSR.address.change(4); });
			FSR.address.setPath();
		});
		
	}(FSR.address.__construct),
	    
	config : {
		title : 'For Sure, Rad! | ',
		0 : { title : 'We Make Apps. Hella Apps.', pathname : '/',
			func : function() {
			}
		},
		1 : { title : 'Products', pathname : '/products/',
			func : function() {
				FSR.movement.productsInit();
			}
		},
		2 : { title : 'Services', pathname : '/services/',
			func : function() {
				FSR.movement.servicesInit();
			}
		},
		3 : { title : 'Contact', pathname : '/contact/',
			func : function() {
				FSR.movement.contactInit();
			}
		},
		4 : { title : 'Technical Articles', pathname : '/technical-articles/',
			func : function() {
				FSR.movement.technicalArticlesInit();
			}
		}
		
	},
   	
	change : function(id) {
		var config = FSR.address.config;
		var stateObj = config[id]['pathname'];
		history.pushState(stateObj, config[id]['title'], config[id]['pathname']);
		titleAppend = config[id]['title'];
		document.title = config['title'] + titleAppend;
		if (FSR.address.currentState == config[id]['pathname']) {
			return false;
		} else {
			FSR.movement.clear();
			FSR.address.currentState = config[id]['pathname'];
		}
		if (FSR.loaded == false) {
			setTimeout(function() {
				config[id]['func'].apply(this);
			}, 1000);
			FSR.loaded = true;
		} else {
			config[id]['func'].apply(this);
		};
	},
	
	setPath : function() {
		var config = FSR.address.config;
		var pathname = window.location.pathname;
		for (i = 0; i < 5; i++) {
			if (config[i]['pathname'] == pathname) {
				FSR.address.change(i);
			}
		}	
	}
}

/*
Drawing Web site Background	
@namespace FSR.drawing
@namespace FSR.drawing.BG
@params void(0)
@return void(0)
*/

FSR.namespace('FSR.drawing');

FSR.drawing = {

	__construct : function() {		
		window.addEventListener('load', function() { FSR.drawing.BG(); }, false);
	}(FSR.drawing.__construct),
	
	BG : function() {
		$('body').append('<canvas id="points"></canvas>');
		canvas = document.getElementById('points');
		context = canvas.getContext('2d');
		context.canvas.width  = window.innerWidth;
		context.canvas.height = window.innerHeight;
		particles = [];
		for (i = 0; i < 100; i++) {
			particles.push({
    			xpos: Math.random() * window.innerWidth,
    			ypos: Math.random() * window.innerHeight,
    			dir: Math.random() * 2 * Math.PI,
     			scale: Math.random() * 0.95 + 0.05,
        		a: Math.random() * 0.1
 			});
		}
		winH = window.innerHeight;
		winW = window.innerWidth;		
		for (z = 0; z < particles.length; z++) {
			context.moveTo(0, 0);
			context.fillStyle = 'rgba(156, 128, 189, ' + particles[z].a + ')';
			context.strokeStyle = '#fff';
			context.lineWidth = particles[z].scale * 10;
			context.stroke();
			context.beginPath();
			context.arc(particles[z].xpos, particles[z].ypos + 15, particles[z].scale * 15, 0, Math.PI * 2, true);
			context.closePath();
			context.fill();
			particles[z].x = particles[z].xpos;
			particles[z].y = particles[z].ypos;
		}
		for (q = 0; q < 100; q++) {
			context.beginPath();
			startParticle = Math.floor(Math.random() * particles.length);
			context.moveTo(particles[startParticle].x, particles[startParticle].y);
			connectingParticle = Math.floor(Math.random() * particles.length);
			context.lineTo(particles[connectingParticle].x, particles[connectingParticle].y);
			context.lineWidth = 0.1;
			context.strokeStyle = 'rgba(156, 128, 189, 1)';
			context.stroke();
		}
	}
}

/*
Airport style flight ticker	
@namespace FSR.ui.textPlay
@namespace FSR.drawing.BG
@params void(0)
@return void(0)
*/

FSR.namespace('FSR.ui.textPlay');

FSR.ui.textPlay = {

	__construct : function() {	
		$(document).ready(function() { 
			FSR.ui.textPlay.init();
		});
	}(FSR.ui.textPlay.__construct),
	
	init : function() {
    	var holder = '#p2';
		var words = ['iPhone.Apps', 'Android.Apps', 'Web.Apps', 'Social.Apps', 'Hella.Apps'];
		var longest = 0;
		var wordsLength = 4;
		var currentWord = $(holder).html();
		$(holder).empty();
		var chars = [
			'a','b','c','d','e','f','g','h','i','j',
			'k','l','m','n','o','p','q','r','s','t','u',
			'v','w','x','y','z','.'
		];
		function randomChar() {
		 	var length = chars.length;
		 	var randomNumber = Math.floor(Math.random() * length);
		 	var theChar = chars[randomNumber];
		 	return theChar;
		};
		var currentWordID = 0;
		function finalLetter(wordID) {
			var letterCount = 1;
			var wordCount = words[wordID].length;
			var wordy = setInterval(function() {
				var arbitrary = 30;
				if (letterCount == wordCount) {
					window.clearInterval(wordy);
					window.clearTimeout(xTimeouts);
					setTimeout(function() {
						$(holder).html(words[wordID]);
					}, 150);
					if (currentWordID < wordsLength) {
						currentWordID++;
						setTimeout(function() {
							next = currentWordID;
							finalLetter(next);
						}, 1000);
					}
				}
				for (i = 0; i < arbitrary; i++) {
					var xTimeouts = setTimeout(function() {
						var tmpHTML = '';
						var tmpCount = letterCount;
						while (tmpCount > 0) {
							var tmpChar = randomChar();
							tmpHTML += tmpChar;
							tmpCount--;
						}
						$(holder).html(tmpHTML);
					}, i * 5);
				}
				letterCount++;
			}, 150);
		}
		setTimeout(function() {
			finalLetter(0);
		}, 1000);
    }
}

/*
Flash style single pixel line preloader	
@namespace FSR.preloader.basic
@params void(0)
@return void(0)
*/

FSR.namespace('FSR.preloader');

FSR.preloader = {

	loaded : false,

	__construct : function() {
	
		$(document).ready(function() {
			FSR.preloader.basic();
		});
	
	}(FSR.preloader.__construct),
	basic : function() {
		var itemsLoaded = 0;
		var loaded = false;
		var items  = new Array();
		var barColor = '#9c80bd';
		var barHeight = '1px';
		var overlay = '#overlay';
		var preloader = '#preloader';
		var siteHolder = ['#container', '#social', '#points', '#windmill'];
		$("html").css({"overflow" : "hidden"});
		$("body").append('<div id="preloader"></div>');
		$("body").append('<div id="overlay"></div>');
		$(overlay).css({
			"top"        : 0,
			"left"       : 0,
			"position"   : "absolute",
			"width"		 : "100%",
			"height"     : "100%",
			"overflow"   : "hidden",
			"z-index"    : 1000
		});
		$(preloader).css({
			"position"   : "absolute",
			"height"     : barHeight,
			"top"        : "50%",
			"background" : barColor,
			"width"      : 0,
			"z-index"    : 1001
		});
						
		var winWidth = $(window).width();
		var newLeft = (winWidth / 2) - 200;
		var finishLeft = (winWidth + 400) + "px"
		$(preloader).css("left", newLeft + "px");
		
		function preloadImages() {
			$("body").find("img").each(function() {
				url = $(this).attr("src");
				items.push(url);
				onProgress();
			});
		};
		
		function onProgress() {
			itemsLoaded++;
			animatePreloader();
		};
		
		function animatePreloader() {			
			if (items.length == 0) {	
				items.length = 1;
			}
			percentage = (items.length / itemsLoaded) * 100;
			newWidth = percentage * 4;
			if (percentage > 99) {
				FSR.preloader.loaded = true;
				$(preloader).stop().animate({width : newWidth + "px"}, 800, "easeOutQuad", function() {
					$(overlay).fadeOut(300, function() {
						$(overlay).remove();
						TCounter = 0;
						for (i = 0; i < siteHolder.length; i++) {				
							$(siteHolder[i]).fadeIn(500);
						}
					});
					$(preloader).animate({"left" : finishLeft}, 1500, "easeOutElastic", function() {
						$(preloader).remove();
					});
				});
			} else {
				$(preloader).stop().animate({width: newWidth + "px"}, 1000, "easeOutQuad");
			}
	
		}
		
		preloadImages();
		animatePreloader();
		
	}
	
}

/*
Play audio on mouse over of menu item	
@namespace FSR.audio.menu
@params void(0)
@return void(0)	
*/

FSR.namespace('FSR.audio');

FSR.audio = {

	__construct : function() {
	
		$(document).ready(function() {
			FSR.audio.menu();
		});
		
	}(FSR.audio.__construct),

	menu : function() {

		var menuItems = $('#menu li');
    	var menuAudio = $('#audio-files').find('audio')[0];
    	menuItems.hover(function() {
       		menuAudio.play();
    	});

	}

}

/*
Fade a link between two hex values on over/out
@namespace FSR.ui.linkFade
@params void(0)
@return void(0)
*/

FSR.namespace('FSR.ui.linkFade');

FSR.ui.linkFade = {

	__construct : function() {
	
		$(document).ready(function() {
			FSR.ui.linkFade.applyLinkFaders('#menu li a');	
			FSR.ui.linkFade.applyLinkFaders('#social a');
		});
		
	}(FSR.ui.linkFade.__construct),

	applyLinkFaders : function(selector) {
		
		var speed = 300;
		var offColor = "#a8a8a8";
		var hoverColor = "#555";
	
		$(selector).each(function() {
			$(this).hover(
				function() {
					$(this).animate({ color : hoverColor }, speed);
				},
				function(){
					$(this).animate({ color : offColor }, speed);
				}
			);
		});
	
	}
	
}

/*

Flash a message/notification on screen
@namespace FSR.ui.flash
@params {String} txt Text to display
@return void(0)
*/

FSR.namespace('FSR.ui.flash');

FSR.ui.flash = function(txt) {
	
	$('<div id="notification"><h1></h1></div>').appendTo('body');
	$('#notification').css({
		backgroundColor : '#fff',
		position : 'absolute',
		top : '150px',
		left: '-400px',
		padding : '15px',
		zIndex : 99999999
	});
	$('#notification h1').css({
		color : '#9c80bd',
		fontSize : '56px',
		textTransform : 'uppercase',
		fontFamily : 'LeagueGothic'	
	});
	$('#notification h1').html(txt);
	centered = ($(window).width() / 2) - ($('#notification').width() / 2);
	$('#notification').animate({'left' : centered }, 500, "easeInOutCirc", function() {
		setTimeout(function() {
			$('#notification').animate({'left' : $(window).width() + $('#notification').width() + 10 }, 300, 'easeInOutCirc', function() {
				$('#notification').remove();
			});
		}, 1000);
	});
	   	
}

/*
Movement specific to FSR
@namespace FSR.movement
@params void(0)
@return void(0)	
*/

FSR.namespace('FSR.movement');

FSR.movement = {

	__construct : function() {
		
		$(document).ready(function() {
		
			$('#contact').css('top', $(window).height() + 150);
			$('#technical-articles').css('top', $(window).height() + 150);
			$('#services').css('top', $(window).height() + 150);
			$('#products').css('top', $(window).height() + 150);
			
			$('#contactSubmitBtn').click(function() {
				
				var postData = {
					'support[sender_name]' : $('#support_sender_name').val(),
					'support[sender_email]' : $('#support_sender_email').val(),
					'support[sender_phone]' : $('#support_sender_phone').val(),
					'support[sender_content]' : $('#support_sender_content').val()
				};
							
				for (x in postData) {
					if (postData[x] === '') {
						postData[x] = '__BLANK__';
					};
				};
				
				var returnCall = function() {
					$('#contact-form input[type=text], #contact-form textarea').val('');
					setTimeout(function() {
						FSR.ui.flash('Message Sent!');
					}, 300);	
					setTimeout(function() {
						FSR.address.change(0);
					}, 100);
					setTimeout(function() {
						$('#contactSubmitBtn').val('Send!');
					}, 1000);
				};
				
				$('#contactSubmitBtn').val('Sending...');
				FSR.ajaxer('/supports', postData, returnCall);
			});
		});
		
	}(FSR.movement.construct),
	
	clear : function() {
   		   		
   		if (FSR.address.currentState == '/contact/') {
   			$('#contact').animate({ 'top' : '-500px' }, { duration: 800, easing: 'easeInOutCirc' });
   		} else if (FSR.address.currentState == '/technical-articles/') {
   			$('#technical-articles').animate({ 'top' : '-500px' }, { duration: 800, easing: 'easeInOutCirc' });
   		} else if (FSR.address.currentState == '/services/') {
   			$('#services').animate({ 'top' : '-500px' }, { duration: 800, easing: 'easeInOutCirc' });
   		} else if (FSR.address.currentState == '/products/') {
   			$('#products').animate({ 'top' : '-500px' }, { duration: 800, easing: 'easeInOutCirc' });
   		}
   	
   	},

   	contactInit : function() {
   		$('#contact').css({'display':'inline'});
   		$('#contact').css(top, $(window).height() + 150);					
   		$('#contact').animate({ top : 90 }, { duration: 800, easing: 'easeInOutCirc' });
   		
   	},

	technicalArticlesInit : function() {
		$('#technical-articles').css({'display':'inline'});
		$('#technical-articles').css(top, $(window).height() + 150);					
		$('#technical-articles').animate({ top : 90 }, { duration: 800, easing: 'easeInOutCirc' });
	
	},
	
	servicesInit : function() {
		$('#services').css({'display':'inline'});
		$('#services').css(top, $(window).height() + 150);			
		$('#services').animate({ top : 90 }, { duration: 800, easing: 'easeInOutCirc' });
	
	},
	
	productsInit : function() {
		$('#products').css({'display':'inline'});
		$('#products').css(top, $(window).height() + 150);			
		$('#products').animate({ top : 90 }, { duration: 800, easing: 'easeInOutCirc' });
	
	}

}

/*
AJAX Wrapper
@namespace FSR.ajaxer
@params {String} URL URL to POST to
@params {Object} postData Data to send via POST
@params {function} returnCall call to execute upon success
@return void(0)
*/

FSR.namespace('FSR.ajaxer');


FSR.ajaxer = function(URL, postData, returnCall) {

	$('body').append('<div id="indicator"></div>');
	$('#indicator').css({
	  	display: 'none',
	  	position: 'absolute',
	  	top: '40%',
	  	left : '50%',
	  	marginLeft : '-19px',
	  	opacity : 0.5,
	  	paddingTop : '',
	  	paddingLeft : '',
		width : '44px',
 		height : '44px', 
	  	backgroundColor : '#a8a8a8',
		borderRadius : 7,
	   	zIndex : 100000
	});	
	
	$('#indicator').html('<img src="/images/ajax-loader.gif" />');
	$('#indicator img').css({
		display : 'block',
		marginTop : '6px',
		marginLeft : '6px'
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
		   	returnCall.apply(this);
	   	}
	});
		
}

/* EOF */