# own-property-proxy
A small utility to get/set object's own property, if object has no required property, it complains loudly

## Installation

```
$ npm i own-property-proxy
```

## Motivation

I've make the following errors again and again:

```javascript
// config.js
function loadConfig() {
  return {
    OPTION_A: 1
  }
}

// api client
let options = loadConfig()
doSomethingWithOptionA(options.OPTIONN_A)  // A typo!!! OPTIONN_A should be OPTION_A

```

In the worst scenario, `doSomethingWithOptionA` accept `OPTION_A` with value
`void 0`, when I found something wrong, I modify `OPTION_A`'s value, but found nothing been changed. That is very confusing and waste of time.

I want options.OPTIONN_A complains loudly when there's no such thing `OPTIONN_A`
in object `options`

## Usage

### common js

```javascript
const opp = require('own-property-proxy').default
```

### esm

```javascript
import opp from 'own-property-proxy'
```

## An example

```javascript
const assert = require('assert').strict

let obj = {
  a: 1,
  x: {
    y: 2
  }
}

obj = opp(obj)

assert.strictEqual(obj.a, 1)
assert.strictEqual(obj.x.y, 2)
assert.throws(() => obj.b, /no such/)
assert.throws(() => obj.x.z, /no such/)

// use Symbol opp.origin to access the original object
assert.strictEqual(obj[opp.origin].b, void 0)

```

check `test.js` to see the complete examples

## FAQ

* I don't want to throw exceptions, I just want a fallback value

```javascript
let o = opp({...})
o.inexistentProperty // throws exception
o[opp.origin].inexistentProperty || defaultValue // get the default value
```
or using [keep-try](https://www.npmjs.com/package/keep-try)

```javascript
import keepTry from 'keep-try'
let inexistentProperty = keepTry(() => opp({}).inexistentProperty, fallbackValue)
```

## Development

```bash
$ git clone git@github.com:xiechao06/own-property-proxy.git
$ cd own-property-proxy
$ npm ci
$ npm dev # watch and test
```
