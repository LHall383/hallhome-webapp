import { takeLatest } from 'redux-saga/effects';
import { handleGetUser } from './handlers/publicUser';
import { handleLoginUser } from './handlers/privateUser';
import { getUser } from '../ducks/publicUser';
import { loginUser } from '../ducks/privateUser';

export function* watcherSaga() {
  yield takeLatest(getUser.type, handleGetUser);
  yield takeLatest(loginUser.type, handleLoginUser);
}
