const mergeStream = require('merge-stream')
const through2 = require('through2')

module.exports = merge

function merge (ins, out) {
  var ms = mergeStream()
  ins.forEach(function (feed) {
    ms.add(feed.list({live: true}).pipe(through2.obj(transform(feed))))
  })

  out.setMeta({title: 'merge', description: ins.map(f => f.key().toString('hex')).join(',')})
  ms.on('data', x => {
    out.push(Object.assign({}, x.item, {"hf:merge:source": x.source}))
  })

  return out
}

function transform (feed) {
  return function (entry, enc, cb) {
    feed.load(entry).then((item) => {
      this.push({entry: entry, item: item, source: feed.key().toString('hex')})
      cb()
    })
  }
}
