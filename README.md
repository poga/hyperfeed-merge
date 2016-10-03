# hyperfeed-merge

Merge multiple hyperfeed into one.

[![NPM Version](https://img.shields.io/npm/v/hyperfeed-merge.svg)](https://www.npmjs.com/package/hyperfeed-merge) [![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

`npm i hyperfeed`

## Synopsis

```js
const merge = require('hyperfeed-merge')
var feed1 = new Hyperfeed()
var feed2 = new Hyperfeed()

var merged = merge(feed1, feed2) // all updates to feed1 and feed2 will be merged into this feed
```

## License

The MIT License
