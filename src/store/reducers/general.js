import { UPDATE_MATCH_TYPE } from '../actionTypes';

const initialState = {
  matchType: '',
};

function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_MATCH_TYPE: {
      return {
        ...state,
        matchType: payload,
      };
    }

    default: {
      return state;
    }
  }
}

export default reducer;
