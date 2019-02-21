import { curry, find, includes, compose, flip } from 'ramda'
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

  const code = compose(
    flip(find)(snapshot),
    includes
  )(searchTxt)

  return code || ''
}

export default curry(findCode)
