import opp, { origin } from './index'
import test from 'tape'

test('basic', function (t) {
  let o = opp({
    a: 1
  })
  t.equal(o.a, 1)
  t.throws(() => o.b, /no such/)
  t.end()
})

test('nested', t => {
  let o = opp({
    a: { b: 1 }
  })
  t.equal(o.a.b, 1)
  t.throws(() => o.a.c, /no such/)
  t.end()
})

test('origin', t => {
  let o = { a: 1 }
  t.equal(o, opp(o)[origin])
  t.end()
})

test('Object.keys/values/entries', t => {
  let o = opp({ a: 1, b: 2 })
  t.ok(Object.keys(o).includes('a'))
  t.ok(Object.keys(o).includes('b'))
  t.ok(Object.values(o).includes(1))
  t.ok(Object.values(o).includes(2))
  t.deepEqual(Object.entries(o), [['a', 1], ['b', 2]])
  t.end()
})
