import { split } from 'ramda'

/**
 * Parse a lineup item to side, piece, file and rank
 * @param  {string} lineupItem
 * @return {Object}
 */
function parseLineupItem (lineupItem) {
  const [side, piece, file, rank] = split('', lineupItem)

  return { side, piece, file, rank }
}

export default parseLineupItem
