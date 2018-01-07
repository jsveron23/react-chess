const initialState = [
  'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
  'bPa7', 'bPb7', 'bPc7', 'bPd7', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
  'wPa2', 'wPb2', 'wPc2', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
  'wRa1', 'wNb1', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
]

/**
 * Reducer
 * @param  {Object} [state=initialState]
 * @param  {Object} action
 * @return {Object}
 */
const reducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case 'SET_NOTATIONS': {
      return [...payload]
    }

    default: {
      return state
    }
  }
}

export default reducer
