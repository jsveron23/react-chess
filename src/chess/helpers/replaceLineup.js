import { curry } from 'ramda'

/**
 * Replace lineup
 * @param  {string} side
 * @param  {string} piece
 * @param  {string} tile
 * @param  {Array}  lineup
 * @return {Array}
 */
function replaceLineup (side, piece, tile, lineup) {
  return lineup.map((item) => {
    if (item.includes(tile)) {
      return `${side}${piece}${tile}`
    }

    return item
  })
}

export default curry(replaceLineup)
