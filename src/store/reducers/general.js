import { CHANGE_IS_OPENING } from '../actionTypes';

const initialState = {
  isOpening: false,
};

function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CHANGE_IS_OPENING: {
      return {
        ...state,
        isOpening: payload,
      };
    }

    default: {
      return state;
    }
  }
}

export default reducer;
