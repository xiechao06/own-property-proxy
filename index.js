import util from 'util'
import wellKnownSymbols from 'well-known-symbols'

export const origin = Symbol('origin')

export function ownPropertyProxy (o) {
  return new Proxy(o, {
    get (obj, prop) {
      if (prop === origin) {
        return obj
      }
      // for console.log
      if (prop === 'inspect' || prop === util.inspect.custom) {
        return util.inspect(o)
      }
      if (o.hasOwnProperty(prop)) {
        let ret = o[prop]
        if (ret !== null && typeof ret === 'object') {
          return ownPropertyProxy(ret)
        }
        return ret
      }
      if (wellKnownSymbols.isWellKnown(prop)) {
        return o[prop]
      }

      throw new Error(o + ' has no such property: ' + prop)
    }
  })
}
