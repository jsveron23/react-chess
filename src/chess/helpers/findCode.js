import * as R from 'ramda'
import { isEmpty } from '~/utils'

const flippedFind = R.flip(R.find)

/**
 * Find a code
 * @param  {Array}  snapshot
 * @param  {String} searchTxt
 * @return {String}
 */
function findCode (snapshot, searchTxt) {
  if (isEmpty(searchTxt)) {
    return searchTxt
  }

  return R.compose(
    R.defaultTo(''),
    flippedFind(snapshot),
    R.includes
  )(searchTxt)
}

export default R.curry(findCode)
