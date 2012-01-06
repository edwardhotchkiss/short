
/*!
  https://github.com/thinkroth/shortUrl/
 */

var url = require('url'),
    express = require('express'),
    short = require('short'),
    app = express.createServer(),
    port = process.env.PORT || 8080;

short.connect("mongodb://localhost/short");

app.get('/api/*', function (req, res) {
  if (req.url === '/favicon.ico') {
    return;
  }
  var removeApi = req.url.slice(5),
      URL = removeApi,
      options = {length : 5};
  short.generate(URL, options, function (error, shortURL) {
    if (error) {
      console.error(error);
    }
    else {
      console.log(shortURL);
      var tinyUrl = "http://127.0.0.1:" + port + "/" + shortURL.hash;
      console.log("URL is " + shortURL.URL + " " + tinyUrl);
      res.end(tinyUrl);
    }
  });
});

app.get('*', function (req, res) {
  if (req.url === '/favicon.ico') {
    return;
  }
  var hash = req.url.slice(1);
  short.retrieve(hash, function (error, shortURLObject) {
    if (error) {console.error(error);
    }
    else {
      if (shortURLObject) {
        res.redirect(shortURLObject.URL, 302);
      }
      else {
        res.send('URL not found!', 404);
        res.end();
      }
    }
  });
});

app.listen(port, function () {
  console.log('Server running on port ' + port);
});

/* EOF */