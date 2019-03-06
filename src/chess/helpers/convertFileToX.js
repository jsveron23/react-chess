import * as R from 'ramda'
import { FILES } from '../constants'

/**
 * Convert file to x
 * @param  {String} file
 * @return {Number}
 */
function convertFileToX (file) {
  return R.compose(
    R.ifElse(R.lt(-1), R.add(1), R.identity),
    R.indexOf(file)
  )(FILES)
}

export default convertFileToX
