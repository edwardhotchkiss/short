
/*

  `short` client side scripts
  
*/

$(document).ready(function() {
  $('#send').click(function() {
    $.Notify('Creating Short URL...'); 
    var postData = {
      url : $('#url').val()
    };
    $('#send').val('shortening');
    $.AJAX('POST', '/api/create', postData, function(response) {
      setTimeout(function() {
        $('#url').val(response.url);
        $.Notify('Shortened URL Created! Click to Copy!');
      }, 750); 
    });
  });
});

/* EOF */