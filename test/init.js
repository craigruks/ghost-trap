'use strict';

var chai = require('chai');
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

});
