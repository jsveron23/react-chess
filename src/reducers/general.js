import * as types from '~/actions'

const initialState = {
  isDoingMatch: false
}

function reducer (state = initialState, action) {
  const { type } = action

  switch (type) {
    case types.TOGGLE_MATCH_STATUS: {
      return {
        ...state,
        isDoingMatch: !state.isDoingMatch
      }
    }

    default: {
      return state
    }
  }
}

export default reducer
