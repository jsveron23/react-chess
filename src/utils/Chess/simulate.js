import { isExist } from '@utils'
import { parseNotation, getEnemy } from './helpers'

/**
 * Test scenarios
 * @param  {...Function} fns
 * @return {Function}
 */
export default function scenarios (fns) {
  const {
    getMovable,
    findNotation,
    getMovement
  } = fns

  return (turn) => (piece) => (target) => {
    const {
      targetNotation,
      targetPosition
    } = target

    /**
     * Reducer for test
     * @param  {*}      res  - config.initialValue or SIMULATION_CONFIG.initialValue
     * @param  {string} tile
     * @return {*}
     * @callback
     */
    return (action) => (res, tile) => {
      const found = findNotation(tile)

      switch (action) {
        case 'CHECK': {
          if (!res.isChecked && isExist(found)) {
            const {
              piece: foundPiece,
              position: foundPosition
            } = parseNotation(found)
            const enemyTurn = getEnemy(turn) // opposite
            const [foundDefaults, foundSpecials] = getMovement(foundPiece)
            const getFoundMovable = getMovable(foundPiece, foundPosition, enemyTurn)
            const movable = getFoundMovable(foundDefaults, foundSpecials)
            const gotcha = movable.indexOf(targetPosition) > -1

            return {
              isChecked: piece === foundPiece && isExist(gotcha),
              kingNotation: targetNotation
            }
          }

          return res
        }

        default: {
          return res
        }
      }
    }
  }
}
