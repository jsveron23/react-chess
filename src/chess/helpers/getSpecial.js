import * as R from 'ramda'
import { SPECIALS } from '../constants'

/**
 * Get special
 * @param  {String} piece
 * @return {Array}
 */
function getSpecial (piece) {
  return R.defaultTo([], SPECIALS[piece])
}

export default getSpecial
