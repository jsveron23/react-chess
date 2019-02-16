import { curry, compose, split, prop as extract } from 'ramda'
import { findSnapshotItem } from '~/chess/helpers'

function _parseSelected (selected) {
  const [tile, side] = split('-', selected)

  return { tile, side }
}

/**
 * Parse selected
 * @param  {string?} selected
 * @param  {Array}   snapshot
 * @return {Object}
 */
function parseSelected (selected, snapshot) {
  const tile = compose(
    extract('tile'),
    _parseSelected
  )(selected)

  const [side, piece, file, rank] = compose(
    split(''),
    findSnapshotItem(tile)
  )(snapshot)

  return { side, piece, file, rank }
}

export default curry(parseSelected)
