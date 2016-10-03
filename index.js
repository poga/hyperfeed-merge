const Hyperfeed = require('hyperfeed')
const mergeStream = require('merge-stream')
const through2 = require('through2')

module.exports = merge

function merge (feeds) {
  var ms = mergeStream()
  feeds.forEach(function (feed) {
    ms.add(feed.list({live: true}).pipe(through2.obj(transform(feed))))
  })

  var out = new Hyperfeed()
  out.setMeta({title: 'merge', description: feeds.map(f => f.key().toString('hex')).join(',')})
  ms.on('data', x => {
    out.push(x.item)
  })

  return out
}

function transform (feed) {
  return function (entry, enc, cb) {
    feed.load(entry).then((item) => {
      this.push({entry: entry, item: item, owner: feed.key().toString('hex')})
      cb()
    })
  }
}
