import { call, put } from 'redux-saga/effects';
import { setUserProfile } from '../../ducks/privateUserDuck';
import { requestGetUserProfile } from '../requests/privateUserRequest';

export function* handleGetUserProfile(action) {
  try {
    const response = yield call(requestGetUserProfile, action.payload.code);
    const { data } = response;
    yield put(setUserProfile(data));
  } catch (error) {
    console.log(error);
  }
}
