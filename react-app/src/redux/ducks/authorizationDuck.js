import { createSlice } from '@reduxjs/toolkit';

const authorizationSlice = createSlice({
  name: 'authorization',
  initialState: {
    code: undefined,
    loggedIn: false,
    authUrl: undefined,
    redirectUri:
      process.env.NODE_ENV === 'production'
        ? 'https://thehallho.me/music-analysis/callback'
        : 'http://localhost:3000/music-analysis/callback',
  },
  reducers: {
    checkAuthCode() {},
    requestAccessToken() {},
    setLoggedIn(state, action) {
      return { ...state, loggedIn: action.payload };
    },
    setAuthData(state, action) {
      return { ...state, code: action.payload };
    },
    setAuthInfo(state, action) {
      return { ...state, authUrl: action.payload.authUrl };
    },
  },
});

export const {
  checkAuthCode,
  requestAccessToken,
  setLoggedIn,
  setAuthData,
  setAuthInfo,
} = authorizationSlice.actions;

export default authorizationSlice.reducer;
