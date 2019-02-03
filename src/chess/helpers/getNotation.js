import { curry } from 'ramda'
import { isExist } from '~/utils'

/**
 * Get notation that includes token (like tile)
 * @param  {Array}   notations
 * @param  {string?} token
 * @return {string}
 */
function getNotation (notations, token) {
  const notation = notations.find((n) => {
    return isExist(token) && n.includes(token)
  })

  return notation || ''
}

export default curry(getNotation)
