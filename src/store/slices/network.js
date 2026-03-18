import { createSlice } from '@reduxjs/toolkit';

const networkSlice = createSlice({
  name: 'network',
  initialState: {
    side: '',
    peerId: '', // my id
    connected: false,
    awaiting: false,
    chatData: [],
  },
  reducers: {
    openNetworkGame: (state, action) => {
      state.peerId = action.payload;
    },
    closeNetworkGame: (state) => {
      state.peerId = '';
      state.connected = false;
    },
    // dispatched by connectedPeerNetwork and joinNetworkGame thunks
    setConnected: (state) => {
      state.connected = true;
    },
    decideSide: (state, action) => {
      state.side = action.payload;
    },
    toggleAwaiting: (state) => {
      state.awaiting = !state.awaiting;
    },
    addMessage: (state, action) => {
      state.chatData = [...(state.chatData || []), action.payload];
    },
    receiveMessage: (state, action) => {
      state.chatData = [...(state.chatData || []), action.payload];
    },
  },
});

export const {
  openNetworkGame,
  closeNetworkGame,
  setConnected,
  decideSide,
  toggleAwaiting,
  addMessage,
  receiveMessage,
} = networkSlice.actions;
export default networkSlice.reducer;
