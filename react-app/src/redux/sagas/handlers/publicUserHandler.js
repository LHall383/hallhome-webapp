import { call, put } from 'redux-saga/effects';
import { setUser } from '../../ducks/publicUserDuck';
import { requestGetUser } from '../requests/publicUserRequest';

export function* handleGetUser(action) {
  try {
    const response = yield call(requestGetUser, action.payload.username);
    const { data } = response;
    yield put(setUser(data));
  } catch (error) {
    console.log(error);
  }
}
