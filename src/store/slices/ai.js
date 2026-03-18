import { createSlice } from '@reduxjs/toolkit';
import { Turn, Opponent } from 'chess/es';
import { updateMatchType } from './general';

const aiSlice = createSlice({
  name: 'ai',
  initialState: {
    // 'w' = player controls White, CPU plays Black (default)
    // 'b' = player controls Black, CPU plays White
    playerSide: 'w',
    cpuTurn: Turn.b,
    thinking: false,
    depth: 3,
  },
  reducers: {
    toggleThinking: (state) => {
      state.thinking = !state.thinking;
    },
    // primitive: set playerSide + cpuTurn directly (thunk updateCpuSide dispatches this)
    setCpuSide: (state, action) => {
      state.playerSide = action.payload;
      // CPU takes the opposite side of the player's choice
      state.cpuTurn = Turn[Opponent[action.payload]];
    },
    updatePlayerSide: (state, action) => {
      // Used by 1 vs 1 mode: only track which side the human starts as.
      // cpuTurn is intentionally left unchanged – irrelevant in 1v1.
      state.playerSide = action.payload;
    },
    updateDepth: (state, action) => {
      state.depth = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateMatchType, (state) => {
      state.thinking = false;
    });
  },
});

export const { toggleThinking, setCpuSide, updatePlayerSide, updateDepth } =
  aiSlice.actions;
export default aiSlice.reducer;
