import { curry, includes } from 'ramda'
import { parseSnapshotItem, parseSelected } from '~/chess/helpers'

/**
 * Get next snapshot
 * @param  {string} selected
 * @param  {string} tile
 * @param  {Array}  snapshot
 * @return {Array}
 */
function getNextSnapshot (selected, tile, snapshot) {
  const { file, rank } = parseSelected(selected, snapshot)
  const selectedTile = `${file}${rank}`

  return snapshot.map((item) => {
    if (includes(selectedTile, item)) {
      const { side, piece } = parseSnapshotItem(item)

      return `${side}${piece}${tile}`
    }

    return item
  })
}

export default curry(getNextSnapshot)
