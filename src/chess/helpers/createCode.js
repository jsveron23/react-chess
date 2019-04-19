import * as R from 'ramda'
import { isEmpty } from '~/utils'

/**
 * Create a code
 * @param  {String} side
 * @param  {String} piece
 * @param  {String} file
 * @param  {String} rank
 * @return {String}
 */
function createCode (side, piece, file, rank) {
  if (isEmpty.or(side, piece, file, rank)) {
    return ''
  }

  return `${side}${piece}${file}${rank}`
}

export default R.curry(createCode)
