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
    x.source.load(`scrap/${x.entry.name}`, {raw: true}) // check if there's scrapped data
      .then(data => {
        return out.save(x.item, x.entry, data)
      })
      .catch(() => {
        // if there's no scrapped data,
        // we just save the item
        out.save(x.item, x.entry)
      })
  })

  return out
}

function transform (feed) {
  return function (entry, enc, cb) {
    feed.load(entry).then((item) => {
      this.push({entry: entry, item: item, source: feed})
      cb()
    })
  }
}
