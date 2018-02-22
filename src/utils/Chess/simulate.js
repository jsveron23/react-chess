import {
  isExist,
  apply
} from '@utils'
import {
  parseNotation,
  getEnemy,
  getAlias
} from './helpers'

export function getTargetInfo (fns) {
  const {
    getMovable,
    findNotation
  } = fns
  let targetNotation, targetPosition

  return (targetTurn, targetPiece, pretendPiece = '') => (movement) => {
    /** @callback */
    const _getTargetNotation = (alias) => findNotation(`${alias}${targetPiece}`)

    /** @callback */
    const _getTargetPosition = (notation) => {
      const { position } = parseNotation(notation)

      targetNotation = notation
      targetPosition = position

      return position
    }

    /** @callback */
    const _getMovable = (position) => getMovable(pretendPiece || targetPiece, position, targetTurn)

    /** @callback */
    const _getTargetMovable = (getTargetMovable) => getTargetMovable(...movement)

    /** @callback */
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

export default function testScenario (options) {
  const {
    turn,
    piece,
    target,
    action,
    fns
  } = options
  const {
    getMovable,
    findNotation,
    getMovement
  } = fns
  const {
    targetNotation,
    targetPosition
  } = target

  const _isCheckerExist = (movable) => movable.includes(targetPosition)

  /** @callback */
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
