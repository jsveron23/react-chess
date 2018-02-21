import {
  isExist,
  apply
} from '@utils'
import {
  parseNotation,
  getEnemy,
  getAlias
} from './helpers'

/**
 * Get target information for running simulation
 */
export function getTargetInfo (fns) {
  const { getMovable, findNotation } = fns
  let targetNotation, targetPosition

  return (targetTurn, targetPiece, pretendPiece = '') => (movement) => {
    /**
     * Get target notation
     * @callback
     */
    const _getTargetNotation = (alias) =>
      findNotation(`${alias}${targetPiece}`)

    /**
     * Get target position
     * @callback
     */
    const _getTargetPosition = (notation) => {
      const { position } = parseNotation(notation)

      targetNotation = notation
      targetPosition = position

      return position
    }

    /**
     * Get movable function
     * @callback
     */
    const _getMovable = (position) =>
      getMovable(pretendPiece || targetPiece, position, targetTurn)

    /**
     * Get target movable data
     * @callback
     */
    const _getTargetMovable = (getTargetMovable) =>
      getTargetMovable(...movement)

    /**
     * Generate results to return
     * @callback
     */
    const _generateResults = (acc, targetMovable) => ({
      ...acc,
      targetSight: targetMovable
    })

    return apply(targetTurn)(getAlias)
      .map(_getTargetNotation)
      .map(_getTargetPosition)
      .map(_getMovable)
      .map(_getTargetMovable)
      .reduce(_generateResults, {
        targetPiece,
        targetNotation,
        targetPosition
      })
  }
}

/**
 * Test scenario
 */
export default function testScenario (fns) {
  const {
    getMovable,
    findNotation,
    getMovement
  } = fns

  return (options) => {
    const {
      turn,
      piece,
      target,
      action
    } = options
    const {
      targetNotation,
      targetPosition
    } = target

    /**
     * Is checker in mobable data?
     */
    const _isCheckerExist = (movable) =>
      movable.includes(targetPosition)

    /**
     * @callback
     */
    return (acc, tile) => {
      const found = findNotation(tile)

      switch (action) {
        case 'CHECK': {
          let { isChecked } = acc

          if (!isChecked && isExist(found)) {
            const targetSide = getEnemy(turn) // another side of target
            const {
              piece: foundPiece,
              position: foundPosition
            } = parseNotation(found)
            const {
              defaults: foundDefaults,
              specials: foundSpecials
            } = getMovement(foundPiece, false)
            const getFoundMovable = getMovable(foundPiece, foundPosition, targetSide)
            const movable = getFoundMovable(foundDefaults, foundSpecials)
            const isCheckerExist = _isCheckerExist(movable)

            isChecked = piece === foundPiece && isCheckerExist

            return {
              checkerNotation: isChecked ? found : '',
              kingNotation: targetNotation,
              isChecked
            }
          }

          return acc
        }

        case 'GET_SIGHT': {
          return [...acc, tile]
        }

        default: {
          return acc
        }
      }
    }
  }
}
