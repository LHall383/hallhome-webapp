import { createSlice } from '@reduxjs/toolkit';

const personalizationSlice = createSlice({
  name: 'privateUser',
  initialState: {
    topTracks: undefined,
    topArtists: undefined,
  },
  reducers: {
    getTopTracks() {},
    setTopTracks(state, action) {
      return { ...state, topTracks: action.payload };
    },
    getTopArtists() {},
    setTopArtists(state, action) {
      return { ...state, topArtists: action.payload };
    },
  },
});

export const {
  getTopTracks,
  setTopTracks,
  getTopArtists,
  setTopArtists,
} = personalizationSlice.actions;

export default personalizationSlice.reducer;
