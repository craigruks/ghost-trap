'use strict';

var chai = require('chai');
var expect = chai.expect;
chai.should();


describe('ghostTrap object', function () {

  it('should be able to be required', function () {
    var ghostTrap = require('../');

    ghostTrap.should.be.a('object');
  });

  it('should import the trap method', function () {
    var ghostTrap = require('../');

    ghostTrap.trap.should.be.a('function');
  });

  it('should return boolean', function () {
    var ghostTrap = require('../');

    expect(ghostTrap.trap()).to.equal(true);
  });

});
