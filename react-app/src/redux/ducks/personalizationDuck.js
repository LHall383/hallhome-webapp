import { createSlice } from '@reduxjs/toolkit';

import { timeRanges } from '../../components/music-analysis/TimeRangeSelect';

const personalizationSlice = createSlice({
  name: 'privateUser',
  initialState: {
    topTracks: undefined,
    topTracksParams: { timeRange: timeRanges[0].data, number: 50 },
    topArtists: undefined,
    topArtistsParams: { timeRange: timeRanges[0].data, number: 50 },
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
