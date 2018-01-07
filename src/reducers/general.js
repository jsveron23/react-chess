const initialState = {
  /**
   * [main, 1p, 2p]
   * @type {String}
   */
  screen: 'main',

  /**
   * [undo, reset, resume]
   * @type {String}
   */
  command: '',

  /**
   * [white, black]
   * @type {String}
   */
  turn: 'white'
}

/**
 * Reducer
 * @param  {Object} [state=initialState]
 * @param  {Object} action
 * @return {Object}
 */
const reducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case 'SET_SCREEN': {
      return { ...state, screen: payload }
    }

    case 'SET_COMMAND': {
      return { ...state, command: payload }
    }

    case 'RESET_COMMAND': {
      return { ...state, command: '' }
    }

    case 'SET_TURN': {
      return { ...state, turn: payload }
    }

    default: {
      return state
    }
  }
}

export default reducer
