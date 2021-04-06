import { takeLatest } from 'redux-saga/effects';
import { handleGetUser } from './handlers/publicUser';
import { getUser } from '../ducks/publicUser';

export function* watcherSaga() {
  yield takeLatest(getUser.type, handleGetUser);
}
