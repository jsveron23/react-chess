import * as R from 'ramda'

/**
 * Return empty string except true
 * @param  {Boolean} is
 * @param  {*}       v
 * @return {*}
 */
function pass (is, v) {
  return is ? v : ''
}

export default R.curry(pass)
