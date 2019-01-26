import * as types from '~/actions'
import { ENEMY } from '~/constants'

const initialState = {
  title: 'React Chess',
  turn: 'white',
  isMatching: false,
  selected: null,
  currentMovableTiles: []
}

const reducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case types.TOGGLE_MATCH_STATUS: {
      return { ...state, isMatching: !state.isMatching }
    }

    case types.TOGGLE_TURN: {
      return { ...state, turn: ENEMY[state.turn] }
    }

    case types.SELECT_PIECE: {
      return { ...state, selected: payload }
    }

    case types.CURRENT_MOVABLE_TILES: {
      return { ...state, currentMovableTiles: payload }
    }

    default: {
      return state
    }
  }
}

export default reducer
