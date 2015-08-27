'use strict';


module.exports = {
  /**
   * Crawls a Ghost blog and returns a static version. It replaces any URL instances of the Ghost web address with the
   * static web address.
   *
   * @param Function. Callback when crawl is complete.
   *
   * @return {boolean} Whether or not the method ran properly
   */
  trap: function (callback) {

    // run callback method if it exists
    if (callback !== undefined) {
      callback();
    }

    return true;
  }
};
