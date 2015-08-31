# ghost-trap [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> Static site generator for the Ghost blogging platform.


## Install

```sh
$ npm install --save ghost-trap
```


## Usage

```js
var ghostTrap = require('ghost-trap');

ghostTrap('localhost', '2368', './build-folder', 'yourdomain.com');
```

### Methods
#### .trap(ghostDomain, ghostPort, staticDirectory, staticWebAddress, [callback], [debug])

Generates a static site from `http://[ghostDomain]:[ghostPort]/` and places it in `staticDirectory` (relative to where you ran the command). You must add `staticWebAddress` as the command also replaces any instance of 'localhost:2368' in the static site to the value of `staticWebAddress` (as Ghost, when run locally, has references to that address).

**Takes:**
- {String} (required) Domain that the ghost instance is running on (usually `localhost`).
- {String} (required) Port that the ghost instance is running on (usually 2368).
- {String} (required) The directory you want the static site built in, relative to the folder where this method is run.
- {String} (required) The web address that replaces the instances ghostDomain in the static build
- {Function} (optional) A callback is made whenever a fetch fails or when the crawl is complete, should listen to it!
- {Function} (optional) This method will be called with verbose information whenever something happens of importance

**Returns:** null

#### .runStaticSite(staticDirectory, staticPort)

Runs the newly made static site from `staticDirectory` on localhost:`staticPort`. This is so you can check that the static site rendered correctly.

**Takes:**
- {String} (required) The directory you want the static site built in, relative to the folder where this method is run.
- {String} (required) Port that the static site should run from.
- {Function} (optional) This method will be called with verbose information whenever something happens of importance

**Returns:**
- {Object} The HTTP server instance. You can run server.close() to stop the service, or hit ctrl+c to exit if on command line.



## Tests
```sh
$ npm run test
```


## Motivation

I love using the Ghost blogging engine. Ideally I wanted to run Ghost locally and host as a static site. This module crawls a locally running Ghost instance and generates a static site.


## Contributors

Feel free to add issues, send pull requests, the works.


## License

MIT © [Craig Ruks](craigruks.com)


[npm-image]: https://badge.fury.io/js/ghost-trap.svg
[npm-url]: https://npmjs.org/package/ghost-trap
[travis-image]: https://travis-ci.org/craigruks/ghost-trap.svg?branch=master
[travis-url]: https://travis-ci.org/craigruks/ghost-trap
[daviddm-image]: https://david-dm.org/craigruks/ghost-trap.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/craigruks/ghost-trap
[coveralls-image]: https://coveralls.io/repos/craigruks/ghost-trap/badge.svg
[coveralls-url]: https://coveralls.io/r/craigruks/ghost-trap
