import { split } from 'ramda'

/**
 * Parse notation to side, piece, file and rank
 * @param  {string} notation
 * @return {Object}
 */
function parseNotation (notation) {
  const [side, piece, file, rank] = split('', notation)

  return { side, piece, file, rank }
}

export default parseNotation
