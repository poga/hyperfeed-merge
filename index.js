const mergeStream = require('merge-stream')
const through2 = require('through2')
const toStream = require('string-to-stream')

module.exports = merge

function merge (ins, out) {
  var ms = mergeStream()
  ins.forEach(function (feed) {
    ms.add(feed.list({live: true, withScrapped: true}).pipe(through2.obj(transform(feed))))
  })

  out.setMeta({title: 'merge', description: ins.map(f => f.key().toString('hex')).join(',')})
  ms.on('data', x => {
    toStream(x.item).pipe(out._archive.createFileWriteStream(x.entry))
  })

  return out
}

function transform (feed) {
  return function (entry, enc, cb) {
    feed.load(entry, {raw: true}).then((item) => {
      this.push({entry: entry, item: item, source: feed.key().toString('hex')})
      cb()
    })
  }
}
