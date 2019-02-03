import { isEmpty, isExist } from '~/utils'
import { transformXY } from '~/chess/helpers'

/**
 * Initial variables
 * - Purpose of variables
 * {
 *   vertical - direction
 *   horizontal - direction
 *   diagonal - direction
 *   pending - to compare between previous tile and next tile
 *   lastKey - key of previous iterate
 * }
 * @type {Object}
 */
const initialObj = {
  vertical: [],
  horizontal: [],
  diagonal: [],
  pending: '',
  lastKey: ''
}

/**
 * Movable reducer
 * @param  {Object} withDirection
 * @param  {string} type
 * @param  {Object} payload
 * @return {Object}
 */
function _reducer (withDirection, type, payload) {
  const { pending, lastKey, tile } = payload

  switch (type) {
    case 'isFirst': {
      return {
        ...withDirection,
        pending: tile
      }
    }

    case 'isLast': {
      const prevDirection = withDirection[lastKey]

      return {
        ...withDirection,
        [lastKey]: [...prevDirection, tile],
        lastKey: '',
        pending: ''
      }
    }

    case 'isDiagonal': {
      return {
        ...withDirection,
        diagonal: [...withDirection.diagonal, pending, tile],
        lastKey: 'diagonal',
        pending: ''
      }
    }

    case 'isVertical': {
      return {
        ...withDirection,
        vertical: [...withDirection.vertical, pending, tile],
        lastKey: 'vertical',
        pending: ''
      }
    }

    case 'isHorizontal': {
      return {
        ...withDirection,
        horizontal: [...withDirection.horizontal, pending, tile],
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

    // TODO: simplify
    const isFirst = isEmpty(pending) // idx === 0
    const isLast = len === idx + 1 && isEmpty(pending) && isExist(lastKey)

    // NOTE: last should be checked before first
    if (isLast) {
      return _reducer(acc, 'isLast', {
        pending,
        lastKey,
        tile
      })
    }

    if (isFirst) {
      return _reducer(acc, 'isFirst', {
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
      type = 'isDiagonal'
    }

    // e.g [0, 1] [0, 2], [0, 3]
    if (x === 0) {
      type = 'isVertical'
    }

    // e.g [1, 0] [2, 0] [3, 0]
    if (y === 0) {
      type = 'isHorizontal'
    }

    return _reducer(acc, type, {
      pending,
      lastKey,
      tile
    })
  }, initialObj)
}

export default transformMovableAsDirection
