import {
  DECIDE_SIDE,
  SEND_MESSAGE,
  RECEIVE_MESSAGE,
  TOGGLE_AWAITING,
  OPEN_NETWORK_GAME,
  CLOSE_NETWORK_GAME,
  JOIN_NETWORK_GAME,
  CONNECTED_PEER_NETWORK,
} from '../actionTypes';

const initialState = {
  side: '',
  peerId: '', // my id
  connected: false,
  awaiting: false,
  chatData: [],
};

function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case OPEN_NETWORK_GAME: {
      return {
        ...state,
        peerId: payload,
      };
    }

    case CLOSE_NETWORK_GAME: {
      return {
        ...state,
        peerId: '',
        connected: false,
      };
    }

    case CONNECTED_PEER_NETWORK:
    case JOIN_NETWORK_GAME: {
      return {
        ...state,
        connected: true,
      };
    }

    case DECIDE_SIDE: {
      return {
        ...state,
        side: payload,
      };
    }

    case TOGGLE_AWAITING: {
      return {
        ...state,
        awaiting: !state.awaiting,
      };
    }

    case RECEIVE_MESSAGE:
    case SEND_MESSAGE: {
      const chatData =
        state.chatData ||
        [
          /* for legacy */
        ];

      return {
        ...state,
        chatData: [...chatData, payload],
      };
    }

    default: {
      return state;
    }
  }
}

export default reducer;
