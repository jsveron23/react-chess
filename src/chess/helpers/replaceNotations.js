import { curry } from 'ramda'

/**
 * Replace notation of notations
 * @param  {string} side
 * @param  {string} piece
 * @param  {string} tile
 * @param  {Array}  notations
 * @return {Array}
 */
function replaceNotations (side, piece, tile, notations) {
  return notations.map((notation) => {
    if (notation.includes(tile)) {
      return `${side}${piece}${tile}`
    }

    return notation
  })
}

export default curry(replaceNotations)
