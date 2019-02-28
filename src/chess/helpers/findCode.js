import { curry, defaultTo, includes, compose, flip, find } from 'ramda'
import { isEmpty } from '~/utils'

/**
 * Find a code
 * @param  {Array}  snapshot
 * @param  {string} searchTxt
 * @return {string}
 */
function findCode (snapshot, searchTxt) {
  if (isEmpty(searchTxt)) {
    return ''
  }

  return compose(
    defaultTo(''),
    flip(find)(snapshot),
    includes
  )(searchTxt)
}

export default curry(findCode)
