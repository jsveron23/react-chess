import { curry, compose, split } from 'ramda'
import { extract } from '~/utils'
import { parseSelected, getLineupItem } from '~/chess/helpers'

/**
 * Get selected lineup
 * @param  {Array}   lineup
 * @param  {string?} selected
 * @return {Object}
 */
function parseSelectedLineupItem (lineup, selected) {
  const [side, piece, file, rank] = compose(
    split(''),
    getLineupItem(lineup),
    extract('tile'),
    parseSelected
  )(selected)

  return { side, piece, file, rank }
}

export default curry(parseSelectedLineupItem)
