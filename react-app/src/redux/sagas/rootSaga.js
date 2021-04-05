import { takeLatest } from 'redux-saga/effects';
import { GET_USER } from '../ducks/publicUser';
import { handleGetUser } from './handlers/publicUser';

export function* watcherSaga() {
  yield takeLatest(GET_USER, handleGetUser);
}
