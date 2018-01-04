import { compose } from '@utils'

/**
 * Set Movable
 * @param  {Object}   args
 * @param  {Function} args.getOriginalMovableData
 * @param  {Function} args.getFilteredMovableData
 * @param  {Array}    args.defaults
 * @param  {Array}    args.specials
 * @return {Function}
 */
export const setMovable = ({ getOriginalMovableData, getFilteredMovableData, ...movement }) => (dispatch, getState) => {
  const getMovable = compose(getFilteredMovableData, getOriginalMovableData)
  const movable = getMovable(movement)

  dispatch({
    type: 'SET_MOVABLE',
    payload: movable
  })

  return Promise.resolve()
}

export function resetMovable () {
  return {
    type: 'RESET_MOVABLE'
  }
}
