import { call, put } from 'redux-saga/effects';
import { setUser } from '../../ducks/publicUser';
import { requestGetUser } from '../requests/publicUser';

export function* handleGetUser(action) {
  try {
    const response = yield call(requestGetUser, action.username);
    const { data } = response;
    yield put(setUser(data));
  } catch (error) {
    console.log(error);
  }
}
