import { ONE_VS_ONE } from '~/config';
import { UPDATE_MATCH_TYPE } from '../actionTypes';

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

    default: {
      return state;
    }
  }
}

export default reducer;
