import * as R from 'ramda'
import { FILES } from '../constants'

/**
 * Convert file to x
 * @param  {String} file
 * @return {Number}
 */
function convertFileToX (file) {
  return R.compose(
    R.unless(R.equals(-1), R.add(1)),
    R.indexOf(file)
  )(FILES)
}

export default convertFileToX
