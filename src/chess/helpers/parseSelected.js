import * as R from 'ramda'
import { splitTo } from '~/utils'
import findCode from './findCode'
import parseCode from './parseCode'

/**
 * Parse selected
 * @param  {Array}  snapshot
 * @param  {String} selected
 * @return {Object}
 */
function parseSelected (snapshot, selected) {
  return R.compose(
    parseCode,
    findCode(snapshot),
    R.prop('tile'),
    splitTo('-', ['tile'])
  )(selected)
}

export default R.curry(parseSelected)
