import { call, put } from 'redux-saga/effects';
import { setUser } from '../../ducks/privateUser';
import { requestLoginUser } from '../requests/privateUser';

export function* handleLoginUser(action) {
  try {
    const response = yield call(requestLoginUser);
    const { data } = response;
    const { redirectUrl, state } = data;
    // set state cookie
    document.cookie = `spotify_auth_state=${state}`;
    window.location = redirectUrl;
    console.log('made it in handleLoginUser');
    yield put(setUser(data));
  } catch (error) {
    console.log(error);
  }
}
