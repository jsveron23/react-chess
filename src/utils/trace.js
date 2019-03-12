import * as R from 'ramda'

/**
 * Simple displying console log (composable)
 * @param  {String} label
 * @return {*}
 */
function trace (label, v) {
  if (process.env.NODE_ENV === 'development') {
    console.log(`${label}: `, v)
  }

  return v
}

export default R.curry(trace)
