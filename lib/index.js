'use strict';


module.exports = {
  /**
   * Crawls a Ghost blog and returns a static version. It replaces any URL instances of the Ghost web address with the
   * static web address.
   *
   * @param String. Domain to download.
   * @param String. (optional) Port to add to the domain. Needs to be separate for simplecrawler.
   * @param String. The directory you want the static site built in, relative to the folder where this method is run.
   * @param String. The web address that replaces the `'ghostDomain' + ':' + 'ghostPort'`
   * @param Function. Callback when crawl is complete.
   *
   * @return {boolean} Whether or not the method ran properly
   */
  trap: function (ghostDomain, ghostPort, staticDirectory, staticWebAddress, callback) {
    // check function params are valid

    if (typeof ghostDomain !== 'string') {
      throw new TypeError('`ghostDomain` must be a string');
    }
    if (typeof staticDirectory !== 'string') {
      throw new TypeError('`staticDirectory` must be a string');
    }
    if (typeof staticWebAddress !== 'string') {
      throw new TypeError('`staticWebAddress` must be a string');
    }


    // run callback method if it exists
    if (callback !== undefined) {
      callback();
    }

    return true;
  }
};
