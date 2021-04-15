import { call, put } from 'redux-saga/effects';
import { setAuthData, setLoggedIn } from '../../ducks/authorizationDuck';
import {
  checkAuthCode,
  requestAccessToken,
} from '../requests/authorizationRequest';

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

export function* handleCheckAuthCode(action) {
  try {
    const response = yield call(checkAuthCode, action.payload.code);
    yield put(setLoggedIn(response.data.valid));
  } catch (error) {
    console.error(error);
  }
}
