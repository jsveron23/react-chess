import * as R from 'ramda'

export const DIAGONAL = 'diagonal'
export const VERTICAL = 'vertical'
export const HORIZONTAL = 'horizontal'

/**
 * @param  {Object} state
 * @param  {String} key
 * @param  {Array}  axisList
 * @return {Object}
 */
function _getDirection (state, key, axisList) {
  const {
    [DIAGONAL]: prevDiagonal,
    [VERTICAL]: prevVertical,
    [HORIZONTAL]: prevHorizontal
  } = state

  switch (key) {
    case DIAGONAL: {
      return {
        ...state,
        [DIAGONAL]: [...prevDiagonal, ...axisList]
      }
    }

    case VERTICAL: {
      return {
        ...state,
        [VERTICAL]: [...prevVertical, ...axisList]
      }
    }

    case HORIZONTAL: {
      return {
        ...state,
        [HORIZONTAL]: [...prevHorizontal, ...axisList]
      }
    }

    default: {
      return state
    }
  }
}

export default R.curry(_getDirection)
