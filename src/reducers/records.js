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
    case 'SET_RECORDS': {
      return [...payload]
    }

    case 'RESET_RECORDS': {
      return []
    }

    default: {
      return state
    }
  }
}

export default reducer
