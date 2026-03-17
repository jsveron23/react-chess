import { ONE_VS_ONE } from '~/presets';
import {
  UPDATE_MATCH_TYPE,
  SAVE_TO_LOCALSTORAGE,
  TOGGLE_FLIP,
} from '../action-types';

const initialState = {
  matchType: ONE_VS_ONE,
  flip: false,
  lastSaved: 0,
};

/**
 * General reducer
 * @param {object} state - Current state
 * @param {object} action - Dispatched action
 * @return {object} Next state
 */
const generalReducer = (state = initialState, action) => {
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
};

export { generalReducer };
