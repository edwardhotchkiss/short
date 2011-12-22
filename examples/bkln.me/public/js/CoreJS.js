
/*!
  
  com.ingklabs.ui.CoreJS()
  Core client-side JS Methods wrapping jQuery

*/

(function() {
  $.extend($.easing, {
    easeInOutExpo: function (x, t, b, c, d) {
      if (t == 0) {
        return b;
      };
      if (t == d) {
        return b + c;
      };
      if ((t /= d / 2) < 1) {
        return c/2 * Math.pow(2, 10 * (t - 1)) + b;
      };
      return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
    }
  });
  var nextZIndex = 99;
  function broPaux(message) {
    throw new Error("Error condition in X");
  };
  function CSSIterator(CSSArr, HTMLObjectID) {
    for (index in CSSArr) {
      $(HTMLObjectID).css(index, CSSArr[index]);
    };
  };
  $.Delta = function(startTime) {
    var delta = new Date() - startTime;
    threshold = 0;
    if (delta <= threshold) {
      return "Just now";
    }
    var units = null;
    var conversions = {
      millisecond: 1,
      second: 1000,
      minute: 60,
      hour:   60,
      day:    24,
      month:  30,
      year:   12
    };
    for (var key in conversions) {
      if (delta < conversions[key]) {
        break;
      } else {
        units = key;
        delta = delta / conversions[key];
      }
    }
    delta = Math.floor(delta);
    if (delta !== 1) {
      units += "s";
    }
    return [delta, units].join(" ");
  };
  $.Notify = function(displayText, callback) {
    callback = callback || function(){};
    $('<div id="notification"><p id="notificationTxt"></p></div>').appendTo("body");
    $("#notificationTxt").html(displayText);
    var notificationDiv = {
      left            : 0,
      height          : 40,
      zIndex          : 99,
      opacity         : 0.8,
      top             : -40,
      width           : "100%",
      position        : "fixed",
      textAlign       : "center",
      background      : "#e2e2e2"
    };
    var notificationP = {
      position      : "relative",
      fontSize      : 12,
      color         : "#111",
      width         : 600,
      margin        : "0 auto 0 auto",
      fontWeight    : "bold",
      textTransform : "uppercase",
      textShadow    : "1px 1px 1px #fff",
      padding       : "12px 0 12px 0",
      fontFamily    : '"Lucida Grande", Tahoma, Verdana, Arial, sans-serif'
    };
    for (index in notificationDiv) {
      $("#notification").css(index, notificationDiv[index]);
    };
    for (index in notificationP) {
      $("#notification p").css(index, notificationP[index]);
    };
    $("#notification").animate({
      top : 0
    }, 750, "easeInOutExpo", function() {
      setTimeout(function() {
        $("#notification").animate({
          top : -40
        }, 750, "easeInOutExpo", function() {
        });
      }, 3000);
      // DONE.
      callback();
    });
  };
  $.AJAX = function(method, URL, postData, callback) {
    callback = callback || function(){};
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
        $("#indicator").fadeIn(700);
    }).ajaxStop(function() {
        $("#indicator").fadeOut(700);
    });
    if (postData !== undefined) {
      $.ajax({
        type : method,
        data : postData,
        url : URL,
        cache : false,
        dataType : "json",
        success : function(response) {
          callback(response);
        }
      });
    } else {
      $.ajax({
        type : method,
        url : URL,
        cache : false,
        dataType : "json",
        success : function(response) {
          callback(response);
        }
      });
    };
  };
  $.Layer = function(options) {
    options = options || {};
    options.__constructor = options.__constructor || function(){};
    options.__destructor = options.__destructor || function(){};
    options.type = options.type || broPaux("Specify a .type (alert, dialog, [Custom]!");
    options.title = options.title || broPaux("Specify a .title!");
    options.buttons = options.buttons || broPaux("Add some buttons!");
    options.message = options.message || null;
    options.__constructor.call();
    var results = [];
    nextZIndex = Math.max.apply(null, $.map($("body > *"), function(a, b) {
      var newResult = {
        zIndex : a,
        semantics : b
      };
      results.push(newResult);
      return (parseInt($(a).css("z-index")) || 1) + 1;
    }));
    $('<div id="layer' + nextZIndex + '"><p id="message"></p><div id="buttons"></div></div>').appendTo("body");
    if (options.message !== null) {
      $("#message").html(options.message);
    };
    var buttonCount = 0;
    options.buttons.forEach(function(button) {
      var ButtonHTML = '<input type="button" id="button' + nextZIndex + buttonCount + '" />';
      $("#buttons").append(ButtonHTML);
      $('#button' + nextZIndex + buttonCount).val(button.title);
      // OVERRIDE?
      if (button.action === null) {
        $('#button' + nextZIndex + buttonCount).click(function() {
          $("#layer" + nextZIndex).animate({
            top : -200
          }, 750, "easeInOutExpo", function() {
            options.__destructor.call();
          });
        });
      };
      buttonCount++;
    });
    $("#buttons").append('<div style="clear:both"></div>');
    var layerCSS = {
      opacity     : 0.75,
      width       : 300,
      height      : 100,
      zIndex      : nextZIndex,
      position    : "absolute",
      background  : "#e2e2e2",
      top         : -200,
      padding     : "20px 20px 20px 20px",
      left        : ($(window).width() / 2) - 150,
      border      : "5px solid #ddd"
    };
    var messageCSS = {
      position    : "relative",
      fontSize    : 11,
      color       : "#111",
      width       : 300,
      margin      : "0 auto 0 auto",
      textShadow  : "1px 1px 1px #fff",
      padding     : "12px 0 12px 0",
      fontFamily  : '"Lucida Grande", Tahoma, Verdana, Arial, sans-serif'
    };
    var buttonHolderCSS = {
      position  : "relative",
      width     : "auto"
    };
    buttonHolderCSS["float"] = "right";
    var buttonCSS = {
      position    : "relative",
      fontSize    : 11,
      color       : "#111",
      width       : 80,
      margin      : "0 auto 0 auto",
      textShadow  : "1px 1px 1px #fff",
      padding     : "5px 7px 5px 7px",
      fontWeight  : "bold",
      fontFamily  : '"Lucida Grande", Tahoma, Verdana, Arial, sans-serif',
      marginRight : "5px"
    };
    // LAYER
    CSSIterator(layerCSS, "#layer" + nextZIndex);
    // MESSAGE
    CSSIterator(messageCSS, "#layer" + nextZIndex + " p#message");
    // BUTTON HOLDER
    CSSIterator(buttonHolderCSS, "#buttons");
    // BUTTONS
    CSSIterator(buttonCSS, "input[type=button]");
    var slideToPos = ($(window).height() / 2) - 200;
    $("#layer" + nextZIndex).animate({
      top : slideToPos
    }, 750, "easeInOutExpo", function() {
      // DONE
    });
  };
})(jQuery);

/* EOF */