import pkg from './package.json'
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import builtins from 'rollup-plugin-node-builtins'
import { terser } from 'rollup-plugin-terser'

export default [
  {
    input: pkg.source,
    output: {
      file: pkg.main,
      format: 'cjs'
    },
    plugins: [
      babel({ runtimeHelpers: true }),
      resolve(),
      commonjs()
    ],
    external: ['util']
  },
  {
    input: pkg.source,
    output: {
      file: pkg.module,
      format: 'es'
    },
    plugins: [
      babel({ runtimeHelpers: true }),
      resolve(),
      commonjs()
    ],
    external: ['util']
  },
  {
    input: pkg.source,
    output: {
      file: 'dist/own-property-proxy.browser.js',
      format: 'iife',
      name: 'ownPropertyProxy'
    },
    plugins: [
      babel({ runtimeHelpers: true }),
      builtins(),
      resolve(),
      commonjs()
    ]
  },
  {
    input: pkg.source,
    output: {
      file: 'dist/own-property-proxy.browser.min.js',
      format: 'iife',
      name: 'ownPropertyProxy'
    },
    plugins: [
      babel({ runtimeHelpers: true }),
      builtins(),
      resolve(),
      commonjs(),
      terser()
    ]
  }
]
