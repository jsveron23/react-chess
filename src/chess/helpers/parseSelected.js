import { split } from 'ramda'

/**
 * Parse selected piece to tile and side
 * @param  {string} selected
 * @return {Object}
 */
function parseSelected (selected) {
  const [tile, side] = split('-', selected)

  return { tile, side }
}

export default parseSelected
