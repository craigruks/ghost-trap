'use strict';

var chai = require('chai');
var expect = chai.expect;
var ghostTrap = require('../');
chai.should();


describe('ghostTrap.trap function', function () {
  it('returns true when successful', function () {
    expect(ghostTrap.trap('localhost', undefined, 'build', 'mydomain.com')).to.equal(true);
  });

  it('should error on malformed domain param', function () {
    var isNumber = 25;

    expect(function () {
      ghostTrap.trap(isNumber, undefined, 'build', 'mydomain.com');
    }).to.throw(TypeError);
  });

  it('should error on malformed staticDirectory param', function () {
    var isNumber = 25;

    expect(function () {
      ghostTrap.trap('localhost', undefined, isNumber, 'mydomain.com');
    }).to.throw(TypeError);
  });

  it('should error on malformed staticWebAddress param', function () {
    var isNumber = 25;

    expect(function () {
      ghostTrap.trap('localhost', undefined, 'build', isNumber);
    }).to.throw(TypeError);
  });

  // make sure the callback method gets run by returning a number that increments up when run in callback method
  it('should run callback param method', function () {
    var called = 0;
    var callback = function () {
      called++;
    };

    ghostTrap.trap('localhost', undefined, 'build', 'mydomain.com', callback);

    expect(called).to.equal(1);
  });


});
