'use strict';

var chai = require('chai');
var expect = chai.expect;
chai.should();


describe('ghostTrap.trap function', function () {

  it('returns true when successful', function () {
    var ghostTrap = require('../');

    expect(ghostTrap.trap()).to.equal(true);
  });

  // make sure the callback method gets run by returning a number that increments up when run in callback method
  it('should run callback method', function () {
    var called = 0;
    var callback = function () {
      called++;
    };

    var ghostTrap = require('../');
    ghostTrap.trap(callback);

    expect(called).to.equal(1);
  });


});
