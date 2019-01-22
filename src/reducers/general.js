import * as types from '~/actions'
import { ENEMY } from '~/constants'

const initialState = {
  title: 'React Chess',
  isMatching: false,
  turn: 'white'
}

const reducer = (state = initialState, action) => {
  const { type } = action

  switch (type) {
    case types.TOGGLE_MATCH_STATUS: {
      return { ...state, isMatching: !state.isMatching }
    }

    case types.TOGGLE_TURN: {
      return { ...state, turn: ENEMY[state.turn] }
    }

    default: {
      return state
    }
  }
}

export default reducer
