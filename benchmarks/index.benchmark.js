
/*!
  Benchmark.js Suite
 */

var benchmark = require('benchmark')
  , short = require('../lib/short')
  , URL = 'http://nodejs.org/'
  , suite = new benchmark.Suite;

/*!
  connect to mongodb
 */

var MONGO_DB = process.env.MONGO_DB || 'mongodb://localhost/short';

short.connect(MONGO_DB);

short.connection.on('open', function() {
  console.log('connected to mongodb');  
});

short.connection.on('error', function(error) {
  throw new Error(error);  
});

/*!
  add tests to suite
 */

suite.add('', function() {
  short.generate(URL, function(error, result){
    return;
  });
})

.on('cycle', function(event, bench) {
  console.log(String(bench));
})
.on('complete', function() {
  process.exit(0);
})

.run({ 'async': true });

/* EOF */