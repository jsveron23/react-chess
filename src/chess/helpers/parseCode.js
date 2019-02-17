import { split } from 'ramda'

/**
 * Parse a code of snapshot
 * @param  {string} code
 * @return {Object}
 */
function parseCode (code) {
  const [side, piece, file, rank] = split('', code)

  return { side, piece, file, rank }
}

export default parseCode
