import { ONE_VS_ONE } from '~/presets';
import { Turn } from 'chess/es';
import {
  UPDATE_MATCH_TYPE,
  SAVE_TO_LOCALSTORAGE,
  TOGGLE_FLIP,
} from '../actionTypes';

const initialState = {
  matchType: ONE_VS_ONE,
  flip: false,
  lastSaved: 0,
  cpu: Turn.w,
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

    case TOGGLE_FLIP: {
      return {
        ...state,
        flip: !state.flip,
      };
    }

    default: {
      return state;
    }
  }
}

export default reducer;
