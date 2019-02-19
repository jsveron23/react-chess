import { curry } from 'ramda'

/**
 * Simple displying console log (composable)
 * @param  {string} label
 * @return {*}
 */
function trace (label, v) {
  if (process.env.NODE_ENV === 'development') {
    console.log(`${label}: `, v)
  }

  return v
}

export default curry(trace)
