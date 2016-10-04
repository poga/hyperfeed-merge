# hyperfeed-merge

Merge multiple hyperfeed into one.

[![NPM Version](https://img.shields.io/npm/v/hyperfeed-merge.svg)](https://www.npmjs.com/package/hyperfeed-merge) [![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

`npm i hyperfeed`

## Synopsis

```js
const merge = require('hyperfeed-merge')
var feed1 = new Hyperfeed()
var feed2 = new Hyperfeed()

var merged = merge([feed1, feed2]) // all updates to feed1 and feed2 will be merged into this feed
```

## API

#### `merge(feeds, opts)`

Merge feeds into one feed.

Options include:

```js
{
  storage: level('./db'), // optional, a level db instance
  key: <KEY>, // optional, pass a key if you want to reuse existed merge feed.
  own: // if key is given, set to true if you own the feed.
}
```

## License

The MIT License
