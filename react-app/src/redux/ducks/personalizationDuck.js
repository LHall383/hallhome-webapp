import { createSlice } from '@reduxjs/toolkit';

const personalizationSlice = createSlice({
  name: 'privateUser',
  initialState: {
    topTracks: undefined,
  },
  reducers: {
    getTopTracks() {},
    setTopTracks(state, action) {
      return { ...state, topTracks: action.payload };
    },
  },
});

export const { getTopTracks, setTopTracks } = personalizationSlice.actions;

export default personalizationSlice.reducer;
