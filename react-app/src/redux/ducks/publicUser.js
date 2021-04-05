const SET_USERNAME = 'setUsername';
export const GET_USER = 'getUser';
const SET_USER = 'setUser';

export const setUsername = (username) => ({
  type: SET_USERNAME,
  username,
});

export const getUser = (username) => ({
  type: GET_USER,
  username,
});

export const setUser = (user) => ({
  type: SET_USER,
  user,
});

const initialState = {
  username: '',
  userData: undefined,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERNAME:
      return { ...state, username: action.username };
    case SET_USER:
      return { ...state, user: action.user };
    default:
      return state;
  }
};

export default reducer;
