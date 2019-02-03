import { curry } from 'ramda'
import { parseNotation, parseSelected } from '~/chess/helpers'

/**
 * Get next notations
 * @param  {string} selected
 * @param  {string} tileName
 * @param  {Array}  notations
 * @return {Array}
 */
function getNextNotations (selected, tileName, notations) {
  const { selectedTile } = parseSelected(selected)

  return notations.map((notation) => {
    if (notation.indexOf(selectedTile) > -1) {
      const { side, piece } = parseNotation(notation)

      return `${side}${piece}${tileName}`
    }

    return notation
  })
}

export default curry(getNextNotations)
