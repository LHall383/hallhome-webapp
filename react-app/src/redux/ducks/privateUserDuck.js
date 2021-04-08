import { createSlice } from '@reduxjs/toolkit';

const privateUserSlice = createSlice({
  name: 'privateUser',
  initialState: {
    code: undefined,
    userData: undefined,
  },
  reducers: {
    requestAccessToken() {},
    setAuthData(state, action) {
      return { ...state, code: action.payload };
    },
    getUserProfile() {},
    setUserProfile(state, action) {
      return { ...state, userData: action.payload };
    },
  },
});

export const {
  requestAccessToken,
  setAuthData,
  getUserProfile,
  setUserProfile,
} = privateUserSlice.actions;

export default privateUserSlice.reducer;
