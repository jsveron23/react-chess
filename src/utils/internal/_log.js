import * as R from 'ramda'

/**
 * @param  {String}    label
 * @param  {*}         v
 * @return {undefined}
 */
function _log (label, v) {
  console.log(`${label}: `, v)

  return v
}

export default R.curry(_log)
