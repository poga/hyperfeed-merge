const tape = require('tape')
const mergeFeed = require('.')
const Hyperfeed = require('hyperfeed')
const memdb = require('memdb')

var f1 = new Hyperfeed()
var f2 = new Hyperfeed()

tape('merge', function (t) {
  var merge = mergeFeed([f1, f2])

  var rs = merge.list({live: true})
  var results = []
  rs.on('data', x => {
    results.push(x)
    if (results.length === 2) {
      merge.load(results[0]).then(item0 => {
        t.same(item0.title, 'foo')
        merge.load(results[1]).then(item1 => {
          t.same(item1.title, 'bar')
          t.end()
        })
      })
    }
  })
  f1.push({title: 'foo'})
  f2.push({title: 'bar'})
})

tape('reuse existing feed', function (t) {
  var storage = memdb()
  var merge = mergeFeed([f1, f2], {storage: storage})
  var merge2 = mergeFeed([f1, f2], {key: merge.key, storage: storage, own: true})

  var rs = merge2.list({live: true})
  var results = []
  rs.on('data', x => {
    results.push(x)
    if (results.length === 2) {
      merge.load(results[0]).then(item0 => {
        t.same(item0.title, 'foo')
        merge.load(results[1]).then(item1 => {
          t.same(item1.title, 'bar')
          t.end()
        })
      })
    }
  })
  f1.push({title: 'foo'})
  f2.push({title: 'bar'})
})
