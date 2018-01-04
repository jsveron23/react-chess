const initialState = []

/**
 * Reducer
 * @param  {Object} [state=initialState]
 * @param  {Object} action
 * @return {Object}
 */
const reducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case 'SET_MOVABLE': {
      return [...payload]
    }

    case 'RESET_MOVABLE': {
      return []
    }

    default: {
      return state
    }
  }
}

export default reducer
