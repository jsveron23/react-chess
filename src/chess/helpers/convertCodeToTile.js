import * as R from 'ramda'
import parseCode from './parseCode'

/**
 * Convert code to tile
 * @param  {String} code
 * @return {String}
 */
function convertCodeToTile (code) {
  if (typeof code !== 'string' || code.length !== 4) {
    throw new Error('invalid code!')
  }

  return R.compose(
    R.prop('tile'),
    parseCode
  )(code)
}

export default convertCodeToTile
