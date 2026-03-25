import { createSlice } from '@reduxjs/toolkit';

const replaySlice = createSlice({
  name: 'replay',
  initialState: {
    isReplaying: false,
    currentGame: null,
    currentStep: 0,
    savedGames: [],
  },
  reducers: {
    startReplay: (state, action) => {
      state.isReplaying = true;
      state.currentGame = action.payload;
      state.currentStep = 0;
    },
    stopReplay: (state) => {
      state.isReplaying = false;
      state.currentGame = null;
    },
    nextStep: (state) => {
      if (state.currentGame) {
        const max = state.currentGame.snapshots.length - 1;
        state.currentStep = Math.min(state.currentStep + 1, max);
      }
    },
    prevStep: (state) => {
      state.currentStep = Math.max(state.currentStep - 1, 0);
    },
    addSavedGame: (state, action) => {
      state.savedGames = [action.payload, ...state.savedGames];
    },
    setSavedGames: (state, action) => {
      state.savedGames = action.payload;
    },
    deleteGame: (state, action) => {
      state.savedGames = state.savedGames.filter(
        (g) => g.id !== action.payload
      );
    },
  },
});

export const {
  startReplay,
  stopReplay,
  nextStep,
  prevStep,
  addSavedGame,
  setSavedGames,
  deleteGame,
} = replaySlice.actions;
export default replaySlice.reducer;
