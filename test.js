const tape = require('tape')
const mergeFeed = require('.')
const hyperfeed = require('hyperfeed')
const memdb = require('memdb')

var hf = hyperfeed()

tape('merge', function (t) {
  var f1 = hf.createFeed()
  var f2 = hf.createFeed()
  var out = hf.createFeed()
  mergeFeed([f1, f2], out)

  var rs = out.list({live: true})
  var results = []
  rs.on('data', x => {
    results.push(x)
    if (results.length === 2) {
      out.load(results[0]).then(item0 => {
        t.same(item0.title, 'foo')
        out.load(results[1]).then(item1 => {
          t.same(item1.title, 'bar')

          out.list((err, entries) => {
            t.error(err)
            t.same(entries.length, 2)
            t.end()
          })
        })
      })
    }
  })
  f1.push({title: 'foo'})
  f2.push({title: 'bar'})
})

