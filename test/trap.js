'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var ghostTrap = require('../');
var expect = chai.expect;
var path = require('path');
var rimraf = require('rimraf');
var http = require('http');
var finalhandler = require('finalhandler');
var serveStatic = require('serve-static');

chai.should();
chai.use(chaiAsPromised);


describe('ghostTrap.trap function', function () {
  it('should error on malformed domain param', function () {
    var isNumber = 25;

    ghostTrap.trap(isNumber, 1, '../tmp', 'mydomain.com', function (err) {
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

    ghostTrap.trap('localhost', 1, '../tmp', isNumber, function (err) {
      expect(err).to.be.an.instanceof(TypeError);
    });
  });

  it('should error when ghost instance is unreachable', function (done) {
    ghostTrap.trap('foobarbaz', 1, '../tmp', 'mydomain.com', function (err) {
      expect(err).to.be.an.instanceof(Error);
      done();
    });
  });

  it('should make directories and then callback success', function (done) {
    // make sure to give enough time to crawl example site
    this.timeout(15000);

    var directory = path.join(__dirname, '../test-default_ghost_static_site');
    var serve = serveStatic(directory);

    var server = http.createServer(function (req, res) {
      var handlerDone = finalhandler(req, res);
      serve(req, res, handlerDone);
    });

    server.listen(2368);

    ghostTrap.trap('localhost', 2368, '../tmp', 'mydomain.com',
      // when complete make sure the message returned is 'success'
      function (success) {
        expect(success).to.equal('success');

        rimraf(path.join(__dirname, '../tmp'), function () {
          server.close();
          done();
        });

      // make sure that subdirectories are being made at some point
      }, function (msg) {
        if (msg === 'madeDirectory') {
          expect(msg).to.equal('madeDirectory');
        }
      });
  });

});
