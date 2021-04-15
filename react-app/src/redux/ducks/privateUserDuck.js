import { createSlice } from '@reduxjs/toolkit';

const privateUserSlice = createSlice({
  name: 'privateUser',
  initialState: {
    userData: undefined,
  },
  reducers: {
    getUserProfile() {},
    setUserProfile(state, action) {
      return { ...state, userData: action.payload };
    },
  },
});

export const { getUserProfile, setUserProfile } = privateUserSlice.actions;

export default privateUserSlice.reducer;
