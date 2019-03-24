import parseCode from './parseCode'
import createTile from './createTile'

/**
 * Convert code to tile
 * @param  {String} code
 * @return {String}
 */
function convertCodeToTile (code) {
  const { file, rank } = parseCode(code)

  return createTile(file, rank)
}

export default convertCodeToTile
