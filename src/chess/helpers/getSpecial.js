import * as R from 'ramda'
import { SPECIALS } from '../constants'

/**
 * Get special
 * @param  {String} piece
 * @return {Array}
 */
function getSpecial (piece) {
  return R.compose(
    R.defaultTo([]),
    R.prop(piece)
  )(SPECIALS)
}

export default getSpecial
