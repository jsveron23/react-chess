import { curry, find, includes, compose, flip } from 'ramda'
import { isEmpty } from '~/utils'

/**
 * Find a code
 * @param  {string} searchText
 * @param  {Array}  snapshot
 * @return {string}
 */
function findCode (searchText, snapshot) {
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
