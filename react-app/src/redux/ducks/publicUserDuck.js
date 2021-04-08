import { createSlice } from '@reduxjs/toolkit';

const publicUserSlice = createSlice({
  name: 'publicUser',
  initialState: {
    username: '',
    userData: undefined,
  },
  reducers: {
    setUsername(state, action) {
      return { ...state, username: action.payload.username };
    },
    getUser() {},
    setUser(state, action) {
      return { ...state, user: action.payload };
    },
  },
});

export const { setUsername, getUser, setUser } = publicUserSlice.actions;

export default publicUserSlice.reducer;
