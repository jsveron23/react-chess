const reducer = (state = [], action) => {
  const { type, payload } = action

  switch (type) {
    case 'SET_RECORDS': {
      return [...payload]
    }

    case 'RESET_RECORDS': {
      return []
    }

    default: {
      return state
    }
  }
}

export default reducer
