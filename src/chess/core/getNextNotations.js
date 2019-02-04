import { curry } from 'ramda'
import { parseNotation, parseSelected } from '~/chess/helpers'

/**
 * Get next notations
 * @param  {string} selected
 * @param  {string} tile
 * @param  {Array}  notations
 * @return {Array}
 */
function getNextNotations (selected, tile, notations) {
  const { tile: selectedTile } = parseSelected(selected)

  return notations.map((notation) => {
    if (notation.indexOf(selectedTile) > -1) {
      const { side, piece } = parseNotation(notation)

      return `${side}${piece}${tile}`
    }

    return notation
  })
}

export default curry(getNextNotations)
