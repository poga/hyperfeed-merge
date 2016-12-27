# hyperfeed-merge

Merge multiple hyperfeed into one.

[![NPM Version](https://img.shields.io/npm/v/hyperfeed-merge.svg)](https://www.npmjs.com/package/hyperfeed-merge) [![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

`npm i hyperfeed-merge`


## Synopsis

```js
const merge = require('hyperfeed-merge')

var hf = hyperfeed()
var feed1 = hf.createFeed()
var feed2 = hf.createFeed()

var out = hf.createFeed()
merge([feed1, feed2], out) // all updates to feed1 and feed2 will be merged into this feed

feed1.push({title: 'foo'}) // **caution**: this promise will be resolved **before** item is pushed into `out`
                           // use list({live: true}) to get merged output since we can't sure when it will be merged
```

## API

#### `merge(feeds, out)`

Merge feeds into one `out` feed.

## License

The MIT License
