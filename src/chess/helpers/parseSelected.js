import { split } from 'ramda'

/**
 * Parse selected piece to tile and side
 * @param  {string} selected
 * @return {Object}
 */
function parseSelected (selected) {
  const [selectedTile, selectedSide] = split('-', selected)

  return { selectedTile, selectedSide }
}

export default parseSelected
