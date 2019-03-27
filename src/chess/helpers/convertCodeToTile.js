import * as R from 'ramda'
import parseCode from './parseCode'
import createTile from './createTile'

/**
 * Convert code to tile
 * @param  {String} code
 * @return {String}
 */
function convertCodeToTile (code) {
  return R.compose(
    R.converge(createTile, [R.prop('file'), R.prop('rank')]),
    parseCode
  )(code)
}

export default convertCodeToTile
