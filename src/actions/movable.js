import { compose } from '@utils'

/**
 * Set Movable
 * @param  {Object}   args
 * @return {Function}
 */
export const setMovable = (args) => (dispatch, getState) => {
  const { getOriginalMovableData, getFilteredMovableData, ...movement } = args
  const getMovable = compose(getFilteredMovableData, getOriginalMovableData)
  const movable = getMovable(movement)
  const action = {
    type: 'SET_MOVABLE',
    payload: movable
  }

  return Promise.resolve(action)
    .then(dispatch)
}

/**
 * Reset movable after moving
 */
export const resetMovable = () => ({
  type: 'RESET_MOVABLE'
})
