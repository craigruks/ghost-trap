'use strict';

var chai = require('chai');
var ghostTrap = require('../');
var expect = chai.expect;
var request = require('request');


describe('ghostTrap.runStaticSite function', function () {
  it('should return an object', function () {
    var server = ghostTrap.runStaticSite('../test-default_ghost_static_site', 2368);
    expect(server).to.be.an('object');

    server.close();
  });

  it('should tell us when the server is ready', function (done) {
    this.timeout(15000);

    var server = ghostTrap.runStaticSite('./test-default_ghost_static_site', 2368);

    request('http://localhost:2368/', function (error, response) {
      expect(error).to.equal(null);
      expect(response.statusCode).to.equal(200);
      server.close();
      done();
    });
  });
});
