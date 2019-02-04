import { curry } from 'ramda'
import { isEmpty } from '~/utils'

/**
 * Get notation that includes token (like tile)
 * @param  {Array}   notations
 * @param  {string?} token
 * @return {string}
 */
function getNotation (notations, token) {
  if (isEmpty(token)) {
    return ''
  }

  const notation = notations.find((n) => {
    return n.includes(token)
  })

  return notation || ''
}

export default curry(getNotation)
