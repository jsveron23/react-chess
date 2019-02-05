import * as types from '~/actions'

const initialState = {
  isMatching: false
}

function reducer (state = initialState, action) {
  const { type } = action

  switch (type) {
    case types.TOGGLE_MATCH_STATUS: {
      return {
        ...state,
        isMatching: !state.isMatching
      }
    }

    default: {
      return state
    }
  }
}

export default reducer
