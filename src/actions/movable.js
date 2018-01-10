import { setNotations } from '@actions/notations'
import { isExist, getLastItem, compose } from '@utils'

/**
 * Set Movable
 * @param  {Object}   args
 * @return {Function}
 */
export const setMovable = (args) => (dispatch, getState) => {
  const { getOriginalMovableData, getFilteredMovableData, ...movement } = args
  const getMovable = compose(getFilteredMovableData, getOriginalMovableData)
  const movable = getMovable(movement)

  return Promise.resolve({
    type: 'SET_MOVABLE',
    payload: movable
  }).then(dispatch)
}

/**
 * Promotion - Pawn
 * @param  {Function} fns
 * @return {Function}
 */
export const doPromotion = (fns) => (dispatch, getState) => {
  dispatch({ type: 'DO_PROMOTION' })

  const { notations, records } = getState()
  const { getMove, promotion, checkUpdate } = fns
  const [lastItem] = getLastItem(records)
  const { white, black } = lastItem
  const [x, y] = getMove({
    record: lastItem,
    side: isExist(black) ? 'black' : 'white'
  }).join('').substr(-2, 2) // ['???? ??(??)']
  const data = { notations, x, y }
  let nextNotations = [...notations]

  if (+y === 1 && isExist(black)) {
    nextNotations = promotion({ ...data, side: 'b' })
  } else if (+y === 8 && isExist(white)) {
    nextNotations = promotion({ ...data, side: 'w' })
  }

  const isUpdate = checkUpdate(nextNotations)
  const isChanged = notations.some(isUpdate)

  if (isChanged) {
    dispatch(setNotations(nextNotations))
  }

  return Promise.resolve({ type: 'DO_PROMOTION_DONE' })
    .then(dispatch)
}

/**
 * Reset movable after moving
 */
export const resetMovable = () => ({
  type: 'RESET_MOVABLE'
})
