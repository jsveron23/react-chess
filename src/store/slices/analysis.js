import { createSlice } from '@reduxjs/toolkit';

const analysisSlice = createSlice({
  name: 'analysis',
  initialState: { history: [], index: -1 },
  reducers: {
    addAnalysis(state, { payload }) {
      state.history.push(payload);
      state.index = state.history.length - 1;
    },
    setIndex(state, { payload }) {
      const clamped = Math.max(0, Math.min(state.history.length - 1, payload));
      state.index = clamped;
    },
    selectAnalysis(state, { payload }) {
      const idx = state.history.findIndex(
        (entry) =>
          entry.thinkingTime === payload.thinkingTime &&
          entry.from?.[0] === payload.from?.[0]
      );
      if (idx !== -1) {
        state.index = idx;
      }
    },
    resetAnalysis(state) {
      state.history = [];
      state.index = -1;
    },
  },
});

export const { addAnalysis, setIndex, selectAnalysis, resetAnalysis } =
  analysisSlice.actions;
export default analysisSlice.reducer;
