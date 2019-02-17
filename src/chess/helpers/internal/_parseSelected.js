import { split } from 'ramda'

/**
 * Parse select to tile and side
 * @param  {string} selected
 * @return {Object}
 */
function _parseSelected (selected) {
  const [tile, side] = split('-', selected)

  return { tile, side }
}

export default _parseSelected
