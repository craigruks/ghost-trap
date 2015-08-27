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


## Tests
```sh
$ npm test
```


## Motivation

I love using the Ghost blogging engine. Ideally I wanted to run Ghost locally and host as a static site. This module crawls
a locally running Ghost instance and generates a static site. I then upload that to a CDN and point my domain to it.


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
