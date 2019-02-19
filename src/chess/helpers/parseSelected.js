import { curry, compose, prop } from 'ramda'
import { findCode, parseCode } from '~/chess/helpers'
import { splitTo } from '~/utils'

/**
 * Parse selected
 * @param  {string} selected
 * @param  {Array}  snapshot
 * @return {Object}
 */
function parseSelected (selected, snapshot) {
  return compose(
    parseCode,
    findCode(snapshot),
    prop('tile'),
    splitTo('-', ['tile'])
  )(selected)
}

export default curry(parseSelected)
