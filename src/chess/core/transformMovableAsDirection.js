import { isEmpty, isExist } from '~/utils'
import { transformXY } from '~/chess/helpers'

const SHOULD_USE_PENDING = 'SHOULD_USE_PENDING'
const IS_LAST = 'IS_LAST'
const IS_DIAGONAL = 'IS_DIAGONAL'
const IS_VERTICAL = 'IS_VERTICAL'
const IS_HORIZONTAL = 'IS_HORIZONTAL'

/**
 * Initial variables
 * @type {Object}
 */
const initialObj = {
  // direction
  vertical: [],

  // direction
  horizontal: [],

  // direction
  diagonal: [],

  // to compare between previous tile and next tile
  pending: '',

  // key of previous iterate
  lastKey: ''
}

/**
 * Movable helper
 * @param  {Object} withDirection
 * @param  {string} type
 * @param  {Object} payload
 * @return {Object}
 */
function _reduceHelper (withDirection, type, payload) {
  const { pending, lastKey, tile } = payload

  switch (type) {
    case SHOULD_USE_PENDING: {
      return {
        ...withDirection,
        pending: tile
      }
    }

    case IS_LAST: {
      const prevDirection = withDirection[lastKey]

      return {
        ...withDirection,
        [lastKey]: [...prevDirection, tile],
        lastKey: '',
        pending: ''
      }
    }

    case IS_DIAGONAL: {
      const { diagonal: prevDiagonal } = withDirection

      return {
        ...withDirection,
        diagonal: [...prevDiagonal, pending, tile],
        lastKey: 'diagonal',
        pending: ''
      }
    }

    case IS_VERTICAL: {
      const { vertical: prevVertical } = withDirection

      return {
        ...withDirection,
        vertical: [...prevVertical, pending, tile],
        lastKey: 'vertical',
        pending: ''
      }
    }

    case IS_HORIZONTAL: {
      const { horizontal } = withDirection

      return {
        ...withDirection,
        horizontal: [...horizontal, pending, tile],
        lastKey: 'horizontal',
        pending: ''
      }
    }

    default: {
      const prevDirection = withDirection[lastKey]

      return {
        ...withDirection,
        [lastKey]: [...prevDirection, pending],
        lastKey: '',
        pending: tile
      }
    }
  }
}

/**
 * Transform movable tiles will sort by directions
 * NOTE: only work for 2+ length
 * @param  {Array} movable
 * @return {Array}
 */
function transformMovableAsDirection (movable) {
  const len = movable.length

  return movable.reduce((acc, tile, idx) => {
    const { pending, lastKey } = acc
    const souldUsePending = isEmpty(pending)
    const isLast = len === idx + 1 && isEmpty(pending) && isExist(lastKey)

    // NOTE: last should be checked before first
    if (isLast) {
      return _reduceHelper(acc, IS_LAST, {
        pending,
        lastKey,
        tile
      })
    }

    if (souldUsePending) {
      return _reduceHelper(acc, SHOULD_USE_PENDING, {
        tile
      })
    }

    const { x: currentFileNum, y: currentRankNum } = transformXY(tile)
    const { x: pendingFileNum, y: pendingRankNum } = transformXY(pending)

    const x = Math.abs(pendingFileNum - currentFileNum)
    const y = Math.abs(pendingRankNum - currentRankNum)

    let type

    // e.g [1, 1], [2, 2], [3, 3]
    if (x === 1 && y === 1) {
      type = IS_DIAGONAL
    }

    // e.g [0, 1] [0, 2], [0, 3]
    if (x === 0) {
      type = IS_VERTICAL
    }

    // e.g [1, 0] [2, 0] [3, 0]
    if (y === 0) {
      type = IS_HORIZONTAL
    }

    return _reduceHelper(acc, type, {
      pending,
      lastKey,
      tile
    })
  }, initialObj)
}

export default transformMovableAsDirection
