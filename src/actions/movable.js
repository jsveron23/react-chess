import { setNotations } from '@actions/notations'
import { getLastItem } from '@utils'

/**
 * Set Movable
 * @return {Object}
 */
export function setMovable (movable) {
  return {
    type: 'SET_MOVABLE',
    payload: movable
  }
}

/**
 * Promotion
 * @param  {...Function} fns
 * @return {Function}
 */
export function promotion (fns) {
  const {
    getMove,
    getAlias,
    updateNotations,
    detectLastTurn
  } = fns

  /**
   * Generate 'x, y' for updating and return alias of last turn
   * @param  {Array}  records
   * @return {Object}
   */
  const gen4NextProc = (records) => {
    const [lastItem] = getLastItem(records)
    const lastTurn = detectLastTurn(lastItem)
    const side = getAlias(lastTurn)
    const getXY = getMove(lastItem)
    const [x, y] = getXY(lastTurn)
      .substr(-2, 2) // ['???? ??(??)']

    return { x, y, side }
  }

  return (dispatch, getState) => {
    const {
      notations,
      records
    } = getState()

    return Promise.resolve(gen4NextProc(records))
      .then(({ x, y, side }) => {
        const isEdge = /1|8/.test(+y)

        if (isEdge) {
          const update = updateNotations(`${side}P${x}${y}`, `${side}Q${x}${y}`)
          const nextNotations = update(notations)

          dispatch(setNotations(nextNotations))
        }

        return { type: 'PROMOTION' }
      })
      .then(dispatch)
  }
}

/**
 * Reset movable after moving
 * @return {Object}
 */
export function resetMovable () {
  return {
    type: 'RESET_MOVABLE'
  }
}
