import { curry, includes } from 'ramda'
import { parseLineupItem, parseSelected } from '~/chess/helpers'

/**
 * Get next lineup
 * @param  {string} selected
 * @param  {string} tile
 * @param  {Array}  lineup
 * @return {Array}
 */
function getNextLineup (selected, tile, lineup) {
  const { file, rank } = parseSelected(selected, lineup)
  const selectedTile = `${file}${rank}`

  return lineup.map((item) => {
    if (includes(selectedTile, item)) {
      const { side, piece } = parseLineupItem(item)

      return `${side}${piece}${tile}`
    }

    return item
  })
}

export default curry(getNextLineup)
