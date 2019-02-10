import { split } from 'ramda'

/**
 * Parse single item of lineup
 * @param  {string} lineupItem
 * @return {Object}
 */
function parseLineupItem (lineupItem) {
  const [side, piece, file, rank] = split('', lineupItem)

  return { side, piece, file, rank }
}

export default parseLineupItem
