import { call, put } from 'redux-saga/effects';
import { setAuthData, setUserProfile } from '../../ducks/privateUserDuck';
import {
  requestAccessToken,
  requestGetUserProfile,
} from '../requests/privateUserRequest';

export function* handleRequestAccessToken(action) {
  try {
    const response = yield call(
      requestAccessToken,
      action.payload.code,
      action.payload.redirect_uri,
    );

    if (response.status === 200) {
      yield put(setAuthData(action.payload.code));
    } else {
      console.log('Access token not created');
    }
  } catch (error) {
    console.error(error);
  }
}

export function* handleGetUserProfile(action) {
  try {
    const response = yield call(requestGetUserProfile, action.payload.code);
    const { data } = response;
    yield put(setUserProfile(data));
  } catch (error) {
    console.log(error);
  }
}
