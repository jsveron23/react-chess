import * as R from 'ramda'

/**
 * Display value on `console.log` while doing compose functions (debug only)
 * @see {@link https://medium.com/javascript-scene/composing-software-an-introduction-27b72500d6ea}
 * @param  {String} label
 * @return {*}
 */
function trace (label, v) {
  console.log(`${label}: `, v)

  return v
}

export default R.curry(trace)
