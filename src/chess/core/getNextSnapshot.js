import { curry } from 'ramda'
import { parseCode, parseSelected } from '~/chess/helpers'

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

  return snapshot.map((code) => {
    if (code.includes(selectedTile)) {
      const { side, piece } = parseCode(code)

      return `${side}${piece}${tile}`
    }

    return code
  })
}

export default curry(getNextSnapshot)
