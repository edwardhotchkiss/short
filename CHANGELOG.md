
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
