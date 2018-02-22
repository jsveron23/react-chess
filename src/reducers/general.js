import * as types from '@actions'

const initialState = {
  screen: 'main', // [main, 1p, 2p]
  command: '', // [undo, reset, resume]
  turn: 'white', // [white, black]
  axis: {} // to perform animation
}

const reducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case types.SET_SCREEN: {
      return { ...state, screen: payload }
    }

    case types.SET_COMMAND: {
      return { ...state, command: payload }
    }

    case types.RESET_COMMAND: {
      return { ...state, command: '' }
    }

    case types.SET_AXIS: {
      return { ...state, axis: payload }
    }

    case types.SET_TURN: {
      return { ...state, turn: payload }
    }

    default: {
      return state
    }
  }
}

export default reducer
