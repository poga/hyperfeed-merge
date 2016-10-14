const mergeStream = require('merge-stream')
const through2 = require('through2')

module.exports = merge

function merge (ins, out) {
  var ms = mergeStream()
  ins.forEach(function (feed) {
    ms.add(feed.list({live: true, withScrapped: true}).pipe(through2.obj(transform(feed))))
  })

  out.setMeta({title: 'merge', description: ins.map(f => f.key().toString('hex')).join(',')})
  ms.on('data', x => {
    if (isScrapped(x.entry.name)) {
      // TODO: we're using private API here so it's super ugly
      // should rewrite after attachment API is finished
      out._saveScrapped({guid: originGUID(x.entry), date: new Date(x.entry.ctime)}, x.item)(() => {})
    } else {
      out.save(JSON.parse(x.item), x.entry)
    }
  })

  return out
}

function transform (feed) {
  return function (entry, enc, cb) {
    feed.load(entry, {raw: true}).then((item) => {
      this.push({entry: entry, item: item, source: feed})
      cb()
    })
  }
}

function isScrapped (entry) {
  return entry.name ? entry.name.startsWith('scrap/') : entry.startsWith('scrap/')
}

function originGUID (entry) {
  return entry.name ? entry.name.replace(/^scrap\//, '') : entry.replace(/^scrap\//, '')
}
