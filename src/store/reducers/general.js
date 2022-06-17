import { ONE_VS_ONE } from '~/presets';
import { Turn } from 'chess/es';
import {
  UPDATE_MATCH_TYPE,
  SAVE_TO_LOCALSTORAGE,
  TOGGLE_THINKING,
  TOGGLE_FLIP,
} from '../actionTypes';

const initialState = {
  matchType: ONE_VS_ONE,
  flip: false,
  lastSaved: 0,
  cpu: Turn.b,
  thinking: false,
};

function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_MATCH_TYPE: {
      return {
        ...state,
        matchType: payload,
        thinking: false,
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

    case TOGGLE_THINKING: {
      return {
        ...state,
        thinking: !state.thinking,
      };
    }

    default: {
      return state;
    }
  }
}

export default reducer;
