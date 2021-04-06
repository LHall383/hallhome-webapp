import { createSlice } from '@reduxjs/toolkit';

const privateUserSlice = createSlice({
  name: 'privateUser',
  initialState: {
    auth: undefined,
  },
  reducers: {
    loginUser() {},
    setUser(state, action) {
      return { ...state, auth: action.payload };
    },
  },
});

export const { loginUser, setUser } = privateUserSlice.actions;

export default privateUserSlice.reducer;
