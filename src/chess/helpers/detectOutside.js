import * as R from 'ramda'
import { isEmpty } from '~/utils'
import getFile from './getFile'

/**
 * Detect outside of diagram
 * @param  {Number}  x
 * @param  {Number}  y
 * @return {Boolean}
 */
function detectOutside (x, y) {
  const file = getFile(x)

  return y <= 0 || y > 8 || isEmpty(file)
}

export default R.curry(detectOutside)
