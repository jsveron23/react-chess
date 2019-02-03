import parseTileName from './parseTileName'
import transformFile from './transformFile'
import transformRank from './transformRank'

/**
 * Transfor, tile to x, y
 * @param  {Object|string} tile
 * @return {Object}
 */
function transformXY (tile) {
  const nextTile = typeof tile === 'string' ? parseTileName(tile) : tile
  const { fileName, rankName } = nextTile
  const x = transformFile(fileName)
  const y = transformRank(rankName)

  return { x, y }
}

export default transformXY
