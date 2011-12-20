
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
    $.AJAX('/api/create', postData, function(response) {
      setTimeout(function() {
        $('#url').val(response.shortened);
        $.Notify('Shortened URL Created! Click to Copy!');
      }, 750); 
    });
  });
});

/* EOF */