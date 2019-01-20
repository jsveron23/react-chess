import * as types from '~/actions'

const initialState = {
  title: 'React Chess',
  isMatching: false,
  turn: 'white'
}

const reducer = (state = initialState, action) => {
  const { type } = action

  switch (type) {
    case types.SET_MATCH_STATUS: {
      return { ...state, isMatching: !state.isMatching }
    }

    default: {
      return state
    }
  }
}

export default reducer
