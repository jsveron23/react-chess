import { FILES } from '../constants'

/**
 * Get file char
 * @param  {Number} fileNum
 * @return {String}
 */
function getFile (fileNum) {
  return FILES[fileNum - 1]
}

export default getFile
