
/*

  `short` client side scripts
  
*/

$(document).ready(function() {
  function testValidURL(potentialURL){
    var URLRegExp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/i;
    if (URLRegExp.test(potentialURL)){
      return true;
    } else {
      return false;
    };
  };
  $('#send').click(function() {
    if (testValidURL($('#url').val())) {
      $.Notify('Creating Short URL...'); 
      var postData = {
        url : $('#url').val()
      };
      $('#send').val('shortening');
      $.AJAX('POST', '/api/create', postData, function(response) {
        setTimeout(function() {
          $('#send').val('shorten');
          $('#url').val(response.url);
          $.Notify('Shortened URL Created! Click to Copy!');
        }, 750); 
      });
    } else {
      $.Notify('Please Enter a valid URL!');
      $('#url').val('');
    };
  });
});

/* EOF */