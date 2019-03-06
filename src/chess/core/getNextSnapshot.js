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

  return snapshot.map((code) => {
    if (code.includes(selectedTile)) {
      const { side, piece } = parseCode(code)

      return `${side}${piece}${tile}`
    }

    return code
  })
}

export default R.curry(getNextSnapshot)
