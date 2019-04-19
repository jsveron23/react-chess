import * as R from 'ramda'
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
    R.prop(0),
    R.split('-')
  )(selected)
}

export default R.curry(parseSelected)
