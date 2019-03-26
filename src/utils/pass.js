import * as R from 'ramda'

/**
 * Pass empty string unless true
 * @param  {Boolean} is
 * @param  {*}       v
 * @return {*}
 */
function pass (is, v) {
  return is ? v : ''
}

export default R.curry(pass)
