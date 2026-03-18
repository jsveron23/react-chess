import { createSlice } from '@reduxjs/toolkit';

const hintSlice = createSlice({
  name: 'hint',
  initialState: { loading: false, data: null },
  reducers: {
    setHintLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setHintData: (state, { payload }) => {
      state.loading = false;
      state.data = payload;
    },
    clearHint: (state) => {
      state.loading = false;
      state.data = null;
    },
  },
});

export const { setHintLoading, setHintData, clearHint } = hintSlice.actions;
export default hintSlice.reducer;
