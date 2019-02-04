import { curry } from 'ramda'

/**
 * Trace log (compose)
 * @param  {string} label
 * @return {*}
 */
function _trace (env) {
  return (label, v) => {
    if (env !== 'test') {
      console.log(`${label}: `, v)
    }

    return v
  }
}

const trace = _trace(process.env.NODE_ENV)

export default curry(trace)
