import * as R from 'ramda'
import { FILES } from '../constants'

/**
 * Get file char
 * @param  {Number} fileNum
 * @return {String}
 */
function getFile (fileNum) {
  return R.compose(
    R.defaultTo(''),
    R.prop(fileNum - 1)
  )(FILES)
}

export default getFile
