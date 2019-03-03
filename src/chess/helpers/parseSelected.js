import { curry, compose, prop } from 'ramda'
import { findCode, parseCode } from '~/chess/helpers'
import { splitTo } from '~/utils'

/**
 * Parse selected
 * @param  {Array}  snapshot
 * @param  {string} selected
 * @return {Object}
 */
function parseSelected (snapshot, selected) {
  return compose(
    parseCode,
    findCode(snapshot),
    prop('tile'),
    splitTo('-', ['tile'])
  )(selected)
}

export default curry(parseSelected)
