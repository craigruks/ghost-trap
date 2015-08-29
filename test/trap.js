'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var ghostTrap = require('../');
var expect = chai.expect;

chai.should();
chai.use(chaiAsPromised);


describe('ghostTrap.trap function', function () {

  it('should error on malformed domain param', function () {
    var isNumber = 25;

    ghostTrap.trap(isNumber, 1, 'build', 'mydomain.com', function (err) {
      expect(err).to.be.an.instanceof(TypeError);
    });
  });

  it('should error on malformed staticDirectory param', function () {
    var isNumber = 25;

    ghostTrap.trap('localhost', 1, isNumber, 'mydomain.com', function (err) {
      expect(err).to.be.an.instanceof(TypeError);
    });
  });

  it('should error on malformed staticWebAddress param', function () {
    var isNumber = 25;

    ghostTrap.trap('localhost', 1, 'build', isNumber, function (err) {
      expect(err).to.be.an.instanceof(TypeError);
    });
  });

  it('should error when ghost instance is unreachable', function (done) {
    ghostTrap.trap('foobarbaz', 1, 'build', 'mydomain.com', function (err) {
      expect(err).to.be.an.instanceof(Error);
      done();
    });
  });

  it('should resolve with success', function (done) {
    // make sure to give enough time to crawl example site
    this.timeout(30000);

    ghostTrap.trap('localhost', 2368, 'build', 'mydomain.com', function (success) {
      expect(success).to.equal('success');
      done();
    });
  });


});
