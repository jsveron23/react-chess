const reducer = (state = [], action) => {
  const { type, payload } = action

  switch (type) {
    case 'SET_MOVABLE': {
      return [...payload]
    }

    case 'RESET_MOVABLE': {
      return []
    }

    default: {
      return state
    }
  }
}

export default reducer
