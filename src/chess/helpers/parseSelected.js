import { curry, compose, split, prop as extract } from 'ramda'
import { getLineupItem } from '~/chess/helpers'

/**
 * Get selected lineup
 * @param  {Array}   lineup
 * @param  {string?} selected
 * @return {Object}
 */
function parseSelected (lineup, selected) {
  const [side, piece, file, rank] = compose(
    split(''),
    getLineupItem(lineup),
    extract(0),
    split('-')
  )(selected)

  return { side, piece, file, rank }
}

export default curry(parseSelected)
