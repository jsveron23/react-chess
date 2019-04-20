import * as R from 'ramda'
import { FILES } from '../constants'

/**
 * Get file char
 * @param  {Number} fileNum
 * @return {String}
 */
function getFile (fileNum) {
  return R.defaultTo('', FILES[fileNum - 1])
}

export default getFile
