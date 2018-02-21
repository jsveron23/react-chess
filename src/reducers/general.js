const initialState = {
  /**
   * [main, 1p, 2p]
   * @type {string}
   */
  screen: 'main',

  /**
   * [undo, reset, resume]
   * @type {string}
   */
  command: '',

  /**
   * [white, black]
   * @type {string}
   */
  turn: 'white',

  /**
   * To perform animation
   * @type {object}
   */
  axis: {}
}

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

    case 'SET_AXIS': {
      return { ...state, axis: payload }
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
