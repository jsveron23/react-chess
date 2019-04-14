import * as R from 'ramda'

const isNotBoolean = R.complement(R.is)(Boolean)

/**
 * Pass empty string unless true
 * @param  {Boolean} is
 * @param  {*}       v
 * @return {*}
 */
function pass (is, v) {
  if (isNotBoolean(is)) {
    throw new Error('Only accept boolean!')
  }

  return is ? v : ''
}

export default R.curry(pass)
