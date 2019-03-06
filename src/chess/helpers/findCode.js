import * as R from 'ramda'
import { isEmpty } from '~/utils'

/**
 * Find a code
 * @param  {Array}  snapshot
 * @param  {String} searchTxt
 * @return {String}
 */
function findCode (snapshot, searchTxt) {
  return R.unless(
    isEmpty,
    R.compose(
      R.defaultTo(''),
      R.flip(R.find)(snapshot),
      R.includes
    )
  )(searchTxt)
}

export default R.curry(findCode)
