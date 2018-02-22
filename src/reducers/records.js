import * as types from '@actions'

const reducer = (state = [], action) => {
  const { type, payload } = action

  switch (type) {
    case types.SET_RECORDS: {
      return [...payload]
    }

    case types.RESET_RECORDS: {
      return []
    }

    default: {
      return state
    }
  }
}

export default reducer
