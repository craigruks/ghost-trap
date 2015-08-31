'use strict';

var Crawler = require('simplecrawler').Crawler;
var fs = require('node-fs');
var path = require('path');
var Spinner = require('cli-spinner').Spinner;
var sprintf = require('sprintf');
var strReplace = require('replace');
var url = require('url');
var http = require('http');
var finalhandler = require('finalhandler');
var serveStatic = require('serve-static');


module.exports = {
  /**
   * Crawls a Ghost blog and returns a static version. It replaces any URL instances of the Ghost web address with the
   * static web address.
   *
   * @param {String} (required) Domain that the ghost instance is running on (usually `localhost`).
   * @param {String} (required) Port that the ghost instance is running on (usually 2368).
   * @param {String} (required) The directory you want the static site built in, relative to the folder where this method is run.
   * @param {String} (required) The web address that replaces the instances ghostDomain in the static build
   * @param {Function} (optional) A callback is made whenever a fetch fails or when the crawl is complete, should listen to it!
   * @param {Function} (optional) This method will be called with verbose information whenever something happens of importance
   *
   * @return undefined
   */
  trap: function (ghostDomain, ghostPort, staticDirectory, staticWebAddress, callback, debug) {
    // check function params are valid
    if (typeof ghostDomain !== 'string') {
      callback(new TypeError('`ghostDomain` must be a string'));
      return;
    }
    if (typeof staticDirectory !== 'string') {
      callback(new TypeError('`staticDirectory` must be a string'));
      return;
    }
    if (typeof staticWebAddress !== 'string') {
      callback(new TypeError('`staticWebAddress` must be a string'));
      return;
    }


    // configure the crawler
    var crawler = new Crawler(ghostDomain);
    crawler.initialPort = ghostPort;
    crawler.stripQuerystring = true;

    // Make sure the user knows that we're doing something
    var spinner = new Spinner('"Don\'t look directly at the trap!" Collecting Ghost now… %s');
    spinner.setSpinnerString('|/-\\');

    // Set to crawl entire domain
    crawler.queue.add('http', ghostDomain, ghostPort, '/');
    // force crawl robots.txt
    crawler.queue.add('http', ghostDomain, ghostPort, '/robots.txt');


    // When a file is received, save file in the appropriate place
    crawler.on('fetchcomplete', function (queueItem, responseBuffer, response) {
      // Parse url
      var parsed = url.parse(queueItem.url);

      // Rename / to index.html
      if (parsed.pathname.slice(-1) === '/') {
        parsed.pathname += 'index.html';
      }

      // Get directory name in order to create any nested dirs
      var dirname = staticDirectory + parsed.pathname.replace(/\/[^\/]+$/, '');

      // Path to save file
      var filepath = staticDirectory + parsed.pathname;

      // Check if DIR exists
      fs.exists(dirname, function (exists) {

        // If DIR exists, write file
        if (exists) {
          fs.writeFile(filepath, responseBuffer, function () {
            debug(sprintf('writeFile %s', filepath));
          });

        // Else, recursively create dir using node-fs, then write file
        } else {
          fs.mkdir(dirname, '0755', true, function () {
            debug(sprintf('mkdir %s', dirname));

            fs.writeFile(filepath, responseBuffer, function () {
              debug(sprintf('writeFile %s', filepath));
            });
          });
        }
      });

      debug(sprintf('fetchcomplete %s, %d bytes, %s, %s', parsed.pathname, responseBuffer.length, filepath, response.headers['content-type']));
    });


    // error out if the local ghostDomain server isn't running
    crawler.on('fetchclienterror', function () {
      // stop crawling
      this.stop();
      spinner.stop();

      callback(new Error('A Ghost instance at http://' + ghostDomain + ' is not currently running'));
    });


    // return success message on complete
    crawler.on('complete', function () {
      // Replace the old domain with the new one
      strReplace({
        regex: ghostDomain + ':' + ghostPort,
        replacement: staticWebAddress,
        paths: [staticDirectory],
        recursive: true,
        silent: true
      });

      spinner.stop();
      callback('success');
    });

    // start crawling
    crawler.start();
    spinner.start();
  },


  /**
   * Runs a newly trapped static site.
   * After starting you can go to a browser and visit http://[staticDirectory]:[staticPort]/
   *
   * @param {String} (required) The directory you want the static site built in, relative to the folder where this method is run.
   * @param {String} (required) Port that the static site should run from.
   * @param {Function} (optional) This method will be called with verbose information whenever something happens of importance
   *
   * @return {Object} The HTTP server instance. You can run server.close() to stop the service, or hit ctrl+c to exit if
   * on command line.
   */
  runStaticSite: function (staticDirectory, staticPort) {
    var directory = path.join(process.cwd(), staticDirectory);
    var serve = serveStatic(directory);

    var server = http.createServer(function (req, res) {
      var handlerDone = finalhandler(req, res);
      serve(req, res, handlerDone);
    });

    server.listen(staticPort);

    console.log('Running on http://localhost:%s', staticPort);

    return server;
  }
};
