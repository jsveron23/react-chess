import * as R from 'ramda'
import isInvalidKey from './isInvalidKey'
import lazy from './lazy'

/**
 * Split by token and create object with name as key
 * @param  {String} token
 * @param  {Array}  names
 * @param  {String} txt
 * @return {Object}
 */
function splitTo (token, names, txt) {
  const reduce = R.addIndex(R.reduce)

  return R.compose(
    reduce((acc, chunk, idx) => {
      const name = names[idx]

      return R.unless(
        R.compose(
          lazy,
          isInvalidKey
        )(name),
        R.assoc(name, chunk)
      )(acc)
    }, {}),
    R.split(token)
  )(txt)
}

export default R.curry(splitTo)
