import * as R from 'ramda'
import { parseCode, parseSelected } from '../helpers'

/**
 * Get next snapshot
 * @param  {String} selected
 * @param  {String} tile
 * @param  {Array}  snapshot
 * @return {Array}
 */
function getNextSnapshot (selected, tile, snapshot) {
  const { file, rank } = parseSelected(snapshot, selected)
  const selectedTile = `${file}${rank}`
  const mapCb = R.ifElse(
    R.includes(selectedTile),
    R.compose(
      ({ side, piece }) => `${side}${piece}${tile}`,
      parseCode
    ),
    R.identity
  )

  return snapshot.map(mapCb)
}

export default R.curry(getNextSnapshot)
