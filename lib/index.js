'use strict';


module.exports = {
  /**
   * Crawls a Ghost blog and returns a static version. It replaces any URL instances of the Ghost web address with the
   * static web address.
   *
   * @return {boolean} Whether or not the method ran properly
   */
  trap: function () {
    return true;
  }
};
