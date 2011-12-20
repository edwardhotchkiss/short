
/*!

  http://github/edwardhotchkiss/short/

*/

var url = require('url'),
    express = require('express'),
    short = require('short'),
    app = express.createServer(),
    port = process.env.PORT || 8000,
    MONGO_DB  = process.env.MONGO_DB || 'mongodb://localhost/short';

short.connect(MONGO_DB);


app.configure(function() {
  app.use(express.static(__dirname+'/public'));
  app.use(express.bodyParser());
  app.use(express.errorHandler());
});

app.configure('development', function() {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function() {
  app.use(express.errorHandler());
});

app.get('/api/*', function (req, res) {
  if (req.url === '/favicon.ico') {
    return;
  }
  var removeApi = req.url.slice(5),
    URL = removeApi;
  short.gen(URL, function (error, shortURL) {
    if (error) {
      console.error(error);
    } 
    else {
      var URL = shortURL.URL;
      var hash = shortURL.hash;
      var tiny_url = "http://127.0.0.1:" + port + "/" + hash;
      console.log("URL is " + URL + " " + tiny_url);
      res.end(tiny_url);
    }
  });
});

app.get('*', function (req, res) {
  if (req.url === '/favicon.ico') {
    return;
  }
  var hash = req.url.slice(1);
  short.get(hash, function (error, shortURLObject) {
    if (error) {console.error(error);
    } 
    else {
      if (shortURLObject) {
        res.redirect(shortURLObject[0].URL);
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
