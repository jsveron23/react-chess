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
 * @param  {...Function} fns
 * @return {Function}
 */
export function getTargetInfo (fns) {
  const { getMovable, findNotation } = fns
  let targetNotation, targetPosition

  return (targetTurn, targetPiece, pretendPiece = '') => (movement) => {
    /**
     * Get target notation
     * @param  {string} alias
     * @return {string}
     * @callback
     */
    const _getTargetNotation = (alias) => findNotation(`${alias}${targetPiece}`)

    /**
     * Get target position
     * @param  {string} notation
     * @return {string}
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
     * @param  {string}   position
     * @return {Function}
     * @callback
     */
    const _getMovable = (position) =>
      getMovable(pretendPiece || targetPiece, position, targetTurn)

    /**
     * Get target movable data
     * @param  {Function} getTargetMovable
     * @return {Array}
     * @callback
     */
    const _getTargetMovable = (getTargetMovable) =>
      getTargetMovable(...movement)

    /**
     * Generate results to return
     * @param  {Object} acc
     * @param  {Array}  targetMovable
     * @return {Object}
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
 * @param  {...Function} fns
 * @return {Function}
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
     * @param  {Array}   movable
     * @return {boolean}
     */
    const _isCheckerExist = (movable) => movable.includes(targetPosition)

    /**
     * @param  {*}      acc  - config.initialValue or SIMULATION_CONFIG.initialValue
     * @param  {string} tile
     * @return {*}
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
