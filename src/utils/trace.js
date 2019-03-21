import * as R from 'ramda'

/**
 * Display log during compose
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
