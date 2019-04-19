import * as R from 'ramda'

/**
 * Debug only
 * @param  {String} label
 * @return {*}
 */
function trace (label, v) {
  console.log(`${label}: `, v)

  return v
}

export default R.curry(trace)
