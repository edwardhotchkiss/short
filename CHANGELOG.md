
2.6.0 / 2015-10-21
==================

  * [dist, contribs] bumped v, added @t27 to contribs
  * Merge pull request #37 from t27/master
  * Added an update call to update the URL or data of a preexisting hash
  * Merge pull request #34 from datermine/patch-2
  * Fix bug with missing update var & unnecessary update.
  * [docs, changelog] updated
  * [dist, bump] add @jperkelens to contributors, bump v
  * Merge pull request #33 from jperkelens/master
  * Only connects if current state is disconnected

2.5.2 / 2015-09-04
==================

  * Merge pull request #33 from jperkelens/master
  * Only connects if current state is disconnected

2.5.1 / 2015-09-02
==================

  * Merge pull request #32 from romanmt/mongo-v-bump
  * Adding romanmt as a contributor
  * Merge pull request #31 from romanmt/mongo-v-bump
  * Bump mongoose version in order to support mongo 3.0 auth

2.5.0 / 2015-02-25
==================

  * Merge pull request #29 from matmar10/master
  * resolves issue #30 - remove unique index on URL; create a new document when existing URL and new hash is specified
  * Reproduces issue #30 - Specifying hash has no effect for pre-existing URL
  * add test case for specifying hash; resolves #28

2.4.0 / 2014-09-06
==================

  * Merge pull request #26 from pwmckenna/patch-1
  * Expose the hash as part of the api
  * Merge pull request #24 from knownasilya/patch-1
  * Fix author link

2.3.0 / 2014-07-01 
==================

 * [dist] bump
 * [shields/badges/whatever] deps
 * [node] bump travis and package reqs to .10.x
 * [package, contribs] added @nippe
 * [minor, license] remove line, derp!
 * Merge pull request #23 from nippe/master
 * Removed an extra promise layer
 * Update README.md
 * Delete paige.config

2.2.0 / 2013-11-22 
==================

 * [contrib] added @pwmckenna
 * [minor] format
 * Merge pull request #22 from pwmckenna/patch-1
 * Update short.js

2.1.0 / 2013-11-06 
==================

 * Merge pull request #20 from lbj96347/master
 * [fix]fix hits feature
 * Merge pull request #19 from bitdeli-chef/master
 * Add a Bitdeli badge to README

2.0.0 / 2013-08-01 
==================

 * [dist] release 2.0.0
 * Merge branch 'develop'
 * [promises] use node-promises my my I hate callbacks
 * Merge branch 'promises' into develop
 * [refactor] node-promise full integration and detailed sha1 hahs refactor
 * [promises] dont use callbacks
 * [docs] update for new api
 * [rewrite]
 * [model] cleanup
 * [license] updated YYYY
 * [travis, hasher] updated travis for just 0.8.x, added short-id using a genuine sha1 sum for a short url

1.7.0 / 2012-10-25 
==================

  * [dist] version bump
  * [test] updated mongoose and reflected within tests
  * [package] reference makefile in scripts
  * [Makefile] use Makefile "make test" (who does not love bash?) ALONG WITH "npm test"
  * [deps] update mongoose and vows to latest
  * [node] bump version
  * [minor] code cleanup and segmentation

1.6.0 / 2012-06-27 
==================

  * [node] 0.6.0+


1.5.1 / 2012-06-22 
==================

  * [docs] add latest contributors [@cbrammer, @lynchseattle] to README
  * [deps] bunp mongoose to latest
  * [docs] stylize
  * [dictatorship] dont <= node engine version, prep for 0.8.x
  * [syntax] i prefer **/ over */ now, corrected
  * [gitignore] added
  * [email] have author match address in contributors, thanks @isaacs
  * [node] test for 0.4.0

1.5.0 / 2012-03-22 
==================

  * [deps] bump mongoose to 2.5.13
  * [package] updated contributors
  * Merge pull request #17 from lynchseattle/master
  * Support for nodejs 0.6.11
  * Added support for passing in custom data in the options when creating a new URL. This will store any meta-information on that URL that you might want to track. A possible use for this would be an ecommerce store with a shortened URL, but you might want to track that this URL was generated for a specific micro-site or even a specific customer.

1.4.7 / 2012-03-22 
==================

  * [package] added bugs
  * [package] added "homepage"
  * [deps] bump mongoose to 2.5.12

1.4.6 / 2012-03-18 
==================

  * [dist] version bump
  * [tests] run all in /test incase of contrib
  * [docs] contribute
  * [node] engine req bump to 0.6.13
  * [cleanup] remove examples/, single file already in README
  * [cleanup] mmhmmm
  * [docs] updated for 1.4.5

1.4.5 / 2012-03-17 
==================

  * [comments]
  * [merge] fix conflicts, remove statics
  * Merge branch 'ifit-master'
  * [merge] fix conflicts
  * Create Connection Option
  * [docs] rebuilt
  * [comments] update style for docs
  * [deps] bump mongoose version to 2.5.10
  * [engine] prep for 0.8.0, req 0.6.12+

1.4.4 / 2012-03-05 
==================

  * [tests] data validity
  * [tests] added short.retrieve
  * [npm registry] search for bit.ly?
  * [deps] bump vows to 0.6.2
  * [tests] spring cleaning
  * [docs] &&
  * [deps] removed Makefile (use npm test now)
  * [npm] use `npm test` vs. Makefile for single command
  * [package] 0.6.X

1.4.3 / 2012-02-18 
==================

  * [dist] version bump
  * [engine] prepare for 0.8.0, bump required engine
  * [minor] formating
  * dont benchmark without tracking

1.4.2 / 2012-01-29 
==================

  * [minor] update basic example
  * remove full express example
  * for full example please see @thinkroth 's work
  * Merge pull request #15 from hudgins/master
  * Fix for retrieve(hash, callback) throwing due to null options.

1.4.1 / 2012-01-23 
==================

  * [API] short.list()

1.4.0 / 2012-01-20 
==================

  * Added atomic logging (thinkroth/master) / options.hash

1.3.1 / 2012-01-18 
==================

  * [docs] update
  * update npmignore for benchmarks and docs
  * nicely generated docs by paige
  * setup `paige` : `[sudo] npm install paige -g
  * use contributors full name
  * hanging commas, exports
  * [refactor]
  * /lib/short.js hanging commas
  * hanging commas
  * [tests] god I love those hanging commas :P
  * basic benchmarking
  * [tests] use Makefile so that we can add benchmarking also
  * [tests] use benchmark.js

1.3.0 / 2012-01-10 
==================

  * [docs] updated mongoose.connection events
  * Merge pull request #12 from thinkroth/master
  * Added unique tracking
  * Merge pull request #11 from thinkroth/master
  * Removed duplicate mongo query
  * Merge pull request #10 from thinkroth/master
  * Added length option

1.2.1 / 2012-01-06 
==================

  * Merge pull request #9 from thinkroth/master
  * Fixed recursion error

1.2.0 / 2012-01-04 
==================

  * retrieve was broken in most recent api change

1.1.4 / 2012-01-01 
==================

  * version bump
  * change usage for examples
  * remove full example, segment out to bkln.me
  * description, notes on migrating
  * opacity in github
  * formating
  * dont test 0.8.0, which doesnt exist (yet) :P
  * changelog

1.1.3 / 2011-12-28 
==================

  * version bump, new email address
  * formating
  * smaller module footprint
  * node api.js vs. API.js
  * comment duplicate
  * include .gitignore
  * changelog for 1.1.2

1.1.2 / 2011-12-27 
==================

  * updated npm test info to align with .npmignore
  * compacted the npm module size with .npmignore
  * added a .npmignore file
  * gunio whitespace robot added ignores for already ignored (globally) .DS_Store files
  * check for valid urls
  * travis using 0.4.x - 0.8.x
  * readme notes on version 1.0.0 plus more descriptive
  * HTML meta tags
  * add "fork me on github" image to bkln.me"

1.1.1 / 2011-12-25 
==================

  * version bump
  * use 1.1.1 now with examples
  * remove debug logging
  * remove complete license from readme, only specify type and owner
  * Changed findByHash to use findOne
  * changelog for 1.0.0
  * remove `base-converter` as a dependency
  * new base 62 URL hasher
  * new API
  * new exports method, expose hasher method
  * description

1.1.0 / 2011-12-23 
==================

  * version bump, using findOne vs. find, better speed [kevin]
  * Merge pull request #8 from thinkroth/master
  * package minor
  * Changed findByHash to use findOne
  * final
  * facepalm!
  * travis?
  * minor fix

1.0.0 / 2011-12-23 
==================

  * remove require(base-converter)
  * complete example uses short 1.0.0 now
  * version bump, updated complete example
  * updated API with docs also updated
  * keywords in package.json
  * remove `base-converter` as a dependency
  * new test for short.hasher
  * new base 62 URL hasher
  * Merge branch 'develop'
  * travis ci will only test master
  * new API
  * code cleanup, emphasis in README
  * new exports method, expose hasher method
  * roth, thats his last name
  * use v0.4.3 on /examples/bkln.me
  * description

0.4.3 / 2011-12-22 
==================

  * mongoose.connection.on(open|error)
  * changes to work with nodejitsu, and display ENV information /env
  * production NODE_ENV
  * updated example to expose ShortModel and retrieve all Shortened URLs
  * comments

0.4.2 / 2011-12-22 
==================

  * expose `ShortURL` mongoose model
  * use exports vs. function/module.exports
  * use request and response vs. req and res for clarity

0.4.1 / 2011-12-22 
==================

  * mongoose isnt actually required by bkln.me example directly, remove dep
  * updated required mongoose version to 2.4.8
  * version bump
  * larger node range to support nodejitsu
  * travis for 0.4-0.8
  * use 0.4.1 (incoming) which will suport 0.4.11 >= 0.8.0
  * bump required `short` version to 0.4.0 for bkln.me
  * rename name for deploy to bkln
  * index to app for package.json/nodejitsu
  * setup for nodejitsu
  * rename MONGO_DB to MONGO_DB_SHORT for nodejitsu deploy
  * rename complete example to bkln.me
  * improvements in the readme
  * readme formating
  * pull requests section on README
  * added kevin to readme via contributors, added license and test `npm test` to readme also

0.4.0 / 2011-12-22 
==================

  * added `Kevin` (@thinkroth) as a contributor
  * more comments, cleaned up code
  * comments
  * Merge pull request #7 from thinkroth/master
  * Optimized write process
  * Merge pull request #6 from thinkroth/master
  * bump required node version to 0.6.0 align travis with that spec also
  * Optimized checkExists query

0.3.0 / 2011-12-20 
==================

  * working example README
  * working complete example :P
  * added CoreJS Client side script, edited to intergrate alongside testing
  * rename for integration of two similar git repos

0.2.8 / 2011-12-18 
==================

  * Added gun.io whitespace changes, version bump
  * Merge pull request #4 from GunioRobot/clean
  * Remove whitespace [Gun.io WhitespaceBot]
  * license
  * new readme format that i have kind of fallen in love with
  * formating, bump travis up to 0.8.0
  * neatification++
  * formating, module version bumps
  * tests
  * version bump 2.2.4
  * Merge pull request #3 from thinkroth/master
  * Added express example to readme
  * [dist] version bump to 0.2.3
  * Merge pull request #2 from thinkroth/master
  * Extended short url ending to 7 digits
  * [dist] version bump
  * travis in readme
  * travis f t w
  * no more sys warnings from node-base-converter, version bumps there and mongoose
  * more engines
  * major bug fix, regression when entry point went from /index to /lib/short, fixed in package as well as a doc minor improvement
