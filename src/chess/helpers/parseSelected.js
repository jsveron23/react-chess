import { curry, compose, split, prop as extract } from 'ramda'
import { findLineupItem } from '~/chess/helpers'

function _parseSelected (selected) {
  const [tile, side] = split('-', selected)

  return { tile, side }
}

/**
 * Parse selected
 * @param  {string?} selected
 * @param  {Array}   lineup
 * @return {Object}
 */
function parseSelected (selected, lineup) {
  const tile = compose(
    extract('tile'),
    _parseSelected
  )(selected)

  const [side, piece, file, rank] = compose(
    split(''),
    findLineupItem(tile)
  )(lineup)

  return { side, piece, file, rank }
}

export default curry(parseSelected)
