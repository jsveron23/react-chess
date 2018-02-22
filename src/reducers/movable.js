import * as types from '@actions'

const reducer = (state = [], action) => {
  const { type, payload } = action

  switch (type) {
    case types.SET_MOVABLE: {
      return [...payload]
    }

    case types.RESET_MOVABLE: {
      return []
    }

    default: {
      return state
    }
  }
}

export default reducer
