import { curry, find, includes, compose, flip } from 'ramda'
import { isEmpty } from '~/utils'

/**
 * Find a code
 * @param  {Array}  snapshot
 * @param  {string} searchText
 * @return {string}
 */
function findCode (snapshot, searchText) {
  if (isEmpty(searchText)) {
    return ''
  }

  const code = compose(
    flip(find)(snapshot),
    includes
  )(searchText)

  return code || ''
}

export default curry(findCode)
