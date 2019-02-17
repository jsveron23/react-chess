import { split } from 'ramda'

function _parseSelected (selected) {
  const [tile, side] = split('-', selected)

  return { tile, side }
}

export default _parseSelected
