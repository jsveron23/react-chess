import * as Utils from '@utils'
import Chess from './'
import Archives from './archives'

/**
 * Specials
 */
class Specials {
  /**
   * Promotion
   * @return {Array}
   */
  static promotion ({
    notations = [],
    side = '',
    x = '',
    y = ''
  }) {
    return Chess.updateNotation({
      notations,
      asEqual: `${side}P${x}${y}`,
      updateTo: `${side}Q${x}${y}`
    })
  }

  /**
   * Calculate special movement (before moving)
   * @return {Array}
   */
  static includSpecialDirection ({
    direction = [],
    specials = [],
    records = [],
    piece = '',
    key = '',
    position = ''
  }) {
    let nextDirection = direction.slice(0)
    let i = specials.length

    while (i--) {
      const specialName = specials[i]
      const specialMove = _routeSpecials({
        special: specialName,
        piece,
        direction,
        key,
        position,
        records
      })

      if (specialMove) {
        nextDirection = specialMove
      }
    }

    return nextDirection
  }
}

/**
 * Pawn moves 2 steps in front of initial (before moving)
 * @return {Array}
 */
function _initDouble ({
  direction = [],
  position = ''
}) {
  const isInit = _isFirstStepPawn({ position })
  // blockcheck
  const oneStepFurther = [0, 2] // axis
  const [firstAxisList] = direction

  return isInit ? [[...firstAxisList, ...[oneStepFurther]]] : [firstAxisList]
}

/**
 * Routes special move, before moving (for detect path)
 * @return {Array?}
 */
function _routeSpecials ({
  notations = [],
  direction = [],
  records = [],
  piece = '',
  special = '',
  key = '',
  position = ''
}) {
  switch (`${piece}-${special}-${key}`) {
    case 'P-initDouble-vertical': {
      return _initDouble({ direction, position })
    }

    case 'P-enPassant-diagonal': {
      return _enPassant({ direction, position, records })
    }

    default: {
      return undefined
    }
  }
}

/**
 * Pawn moves diagonal and attack
 * @return {Array}
 */
function _enPassant ({
  direction = [],
  records = [],
  position = ''
}) {
  const lastItem = Utils.getLastItem(records, true)

  if (Utils.isEmpty(lastItem)) {
    return [...direction]
  }

  const turn = _isWhiteTurned({ record: lastItem }) ? 'white' : 'black'
  const enemy = Chess.getEnemy({ side: turn })
  const [enemyMove] = Archives.getMove({ record: lastItem, side: enemy })

  if (Utils.isExist(enemyMove)) {
    const howManyStep = _howManyStepPawn({ move: enemyMove })
    const [myFile, myRank] = position.split('')
    const myFileIdx = Chess.getFileIdx({ char: myFile })
    const [enemyFile, enemyRank] = `${enemyMove.substr(-2, 1)}${enemyMove.substr(-1)}`.split('')
    const enemyFileIdx = Chess.getFileIdx({ char: enemyFile })
    const isSibling = Math.abs(myFileIdx - enemyFileIdx) === 1
    const isAdjustedLine = parseInt(myRank, 10) === parseInt(enemyRank, 10)

    if ((howManyStep === 2) && isAdjustedLine && isSibling) {
      const nextX = enemyFileIdx - myFileIdx
      const axis = [nextX, 1]
      const axisList = [axis]

      return [axisList]
    }
  }

  return [...direction]
}

/**
 * Is ready to first step?
 * @return {Boolean}
 */
function _isFirstStepPawn ({
  position = ''
}) {
  return /^.(2|7)$/.test(position)
}

/**
 * Detect turn
 * @return {Boolean}
 */
function _isWhiteTurned ({
  record = {}
}) {
  return (
    Utils.isEmpty(record) ||
    (Utils.isExist(record) && Object.keys(record).length === 2)
  )
}

/**
 * Calculate how many step fowards
 * @return {Number}
 */
function _howManyStepPawn ({
  move = ''
}) {
  const steps = move
    .split(' ')
    .map(notation => (parseInt(notation.substr(-1), 10)))
    .reduce((prevNotation, currNotation) => (currNotation - prevNotation))

  return Math.abs(steps)
}

export default Specials
