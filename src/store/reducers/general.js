import { ONE_VS_ONE } from '~/config';
import {
  UPDATE_MATCH_TYPE,
  SAVE_TO_LOCALSTORAGE,
  OPEN_NETWORK_GAME,
  JOIN_NETWORK_GAME,
  CONNECTED_PEER_NETWORK,
} from '../actionTypes';

const initialState = {
  matchType: ONE_VS_ONE,
  connected: false,
  peerId: '',
  lastSaved: null,
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

    case OPEN_NETWORK_GAME: {
      return {
        ...state,
        peerId: payload,
      };
    }

    case CONNECTED_PEER_NETWORK:
    case JOIN_NETWORK_GAME: {
      return {
        ...state,
        connected: true,
      };
    }

    default: {
      return state;
    }
  }
}

export default reducer;
