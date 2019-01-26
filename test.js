import { f } from './index'
import test from 'tape'

test('ok', function (t) {
  t.equal(f(), 1)
  t.end()
})
