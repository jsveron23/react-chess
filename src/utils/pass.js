import * as R from 'ramda'

const isNotBoolean = R.complement(R.is)(Boolean)

/**
 * Pass value if true, otherwise empty string
 * @param  {Boolean} is
 * @param  {*}       v
 * @return {*}
 */
function pass (is, v) {
  if (isNotBoolean(is)) {
    throw new Error('Only accept boolean type!')
  }

  return is ? v : ''
}

export default R.curry(pass)
