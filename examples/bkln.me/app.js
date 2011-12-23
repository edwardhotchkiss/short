
/*!

  http://github/edwardhotchkiss/short/

*/

var url = require('url'),
    express = require('express'),
    short = require('../../lib/short'),
    app = express.createServer(),
    port = process.env.PORT || 8000,
    ShortURL = short.ShortURL,
    MONGO_DB_SHORT = process.env.MONGO_DB_SHORT || 'mongodb://localhost/short';

/*!
  Connect to MongoDB w/ MongooseJS
 */

short.connect(MONGO_DB_SHORT);

/*!
  Setup ExpressJS
 */

app.configure('production', function() {
  app.use(express.static(__dirname+'/public'));
  app.use(express.bodyParser());
});

/*!
  API Calls to Generate Short URLs
 */

app.post('/api/*', function(request, response) {
  if (request.url === '/favicon.ico') {
    return;
  }
  var URL = request.body['url'];
  short.generate(URL, function (error, shortURL) {
    console.log(shortURL);
    if (error) {
      console.error(error);
    } else {
      var URL = shortURL.URL;
      var hash = shortURL.hash;
      var tiny_url = 'http://' + request.headers.host + '/' + hash;
      console.log('URL is ' + tiny_url);
      response.send({ url:tiny_url });
    }
  });
});

/*!
  Display ENV info for (failing) Nodejitsu
 */

app.get('/env', function(request, response) {
  response.send(
    {
      port : port,
      MONGO_DB_SHORT : MONGO_DB_SHORT
    }
  );  
});

/*!
  Display all Short URL MongoDB Documents in JSON format
 */

app.get('/urls', function(request, response) {
  ShortURL.find({}, function(error, results) {
    if (error) {
      console.error(error);
    } else {
      response.send(results);
    }
  }); 
});

/*!
  Retrieve Short URLs & Redirect
 */

app.get('*', function(request, response) {
  if (request.url === '/favicon.ico') {
    return;
  }
  var hash = request.url.slice(1);
  short.retrieve(hash, function (error, shortURLObject) {
    if (error) {
      console.error(error);
    }  else {
      if (shortURLObject) {
        response.redirect(shortURLObject.URL, 302);
      } else {
        response.send('URL not found!', 404);
        response.end();
      }
    }
  });
});

/*!
  ExpressJS, Listen on <port>
 */

app.listen(port, function() {
  console.log('Server running on port ' + port);
});

/* EOF */
