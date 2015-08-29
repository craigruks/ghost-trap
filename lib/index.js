'use strict';

var Crawler = require('simplecrawler').Crawler;


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
  trap: function (ghostDomain, ghostPort, staticDirectory, staticWebAddress, callback) {
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
    crawler.queue.add('http', ghostDomain, ghostPort, '/robots.txt');

    // error out if the local ghostDomain server isn't running
    crawler.on('fetchclienterror', function () {
      // stop crawling
      this.stop();

      callback(new Error('A Ghost instance at http://' + ghostDomain + ' is not currently running'));
    });

    // return success message on complete
    crawler.on('complete', function () {
      callback('success');
    });

    // start crawling
    crawler.start();
  }
};
