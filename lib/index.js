'use strict';

var Crawler = require('simplecrawler').Crawler;
var fs = require('node-fs');
var path = require('path');
var url = require('url');
var sprintf = require('sprintf');
var strReplace = require('replace');


module.exports = {
  /**
   * Crawls a Ghost blog and returns a static version. It replaces any URL instances of the Ghost web address with the
   * static web address.
   *
   * @param {String} Domain that the ghost instance is running on (usually `localhost`).
   * @param {String} Port that the ghost instance is running on (usually 2368).
   * @param {String} The directory you want the static site built in, relative to the folder where this method is run.
   * @param {String} The web address that replaces the instances ghostDomain in the static build
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

    // force crawling of robots.txt
    // crawler.queue.add('http', ghostDomain, ghostPort, '/robots.txt');
    // crawler.queue.add('http', ghostDomain, ghostPort, '/');

    // Where to save static site
    staticDirectory = path.join(__dirname, staticDirectory);


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

      callback('success');
    });

    // start crawling
    crawler.start();
  }
};
