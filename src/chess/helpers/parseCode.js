import { isExist } from '~/utils'
import createTile from './createTile'

/**
 * Parse a code of snapshot
 * @param  {String} code
 * @return {Object}
 */
function parseCode (code) {
  const [side, piece, file, rank] = code.split('')
  const tile = createTile(file, rank)
  const parsed = { side, piece, file, rank, tile }
  const isValid = isExist.and(side, piece, file, rank, tile)

  return isValid ? parsed : {}
}

export default parseCode
