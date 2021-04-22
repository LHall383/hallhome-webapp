import { createSlice } from '@reduxjs/toolkit';

const playerSlice = createSlice({
  name: 'player',
  initialState: {
    recentlyPlayed: undefined,
  },
  reducers: {
    getRecentlyPlayed() {},
    setRecentlyPlayed(state, action) {
      return { ...state, recentlyPlayed: action.payload };
    },
  },
});

export const { getRecentlyPlayed, setRecentlyPlayed } = playerSlice.actions;

export default playerSlice.reducer;
