import { parseTile, convertFileToX, convertRankToY } from '~/chess/helpers'

/**
 * Convert tile to axis
 * @param  {string} tile
 * @return {Object}
 */
function convertTileToAxis (tile) {
  const { file, rank } = parseTile(tile)
  const x = convertFileToX(file)
  const y = convertRankToY(rank)

  return { x, y }
}

export default convertTileToAxis
