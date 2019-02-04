import { curry, compose, split } from 'ramda'
import { extract } from '~/utils'
import { parseSelected, getNotation } from '~/chess/helpers'

/**
 * Get selected notation
 * @param  {Array}   notations
 * @param  {string?} selected
 * @return {Object}
 */
function parseSelectedNotation (notations, selected) {
  const [side, piece, file, rank] = compose(
    split(''),
    getNotation(notations),
    extract('tile'),
    parseSelected
  )(selected)

  return { side, piece, file, rank }
}

export default curry(parseSelectedNotation)
