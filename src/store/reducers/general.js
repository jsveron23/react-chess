import { ONE_VS_ONE } from '~/presets';
import { UPDATE_MATCH_TYPE, SAVE_TO_LOCALSTORAGE } from '../actionTypes';

const initialState = {
  matchType: ONE_VS_ONE,
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

    case SAVE_TO_LOCALSTORAGE: {
      return {
        ...state,
        lastSaved: payload,
      };
    }

    default: {
      return state;
    }
  }
}

export default reducer;
