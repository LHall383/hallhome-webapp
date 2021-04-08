import { takeLatest } from 'redux-saga/effects';
import { getUser } from '../ducks/publicUserDuck';
import { handleGetUser } from './handlers/publicUserHandler';
import { getUserProfile, requestAccessToken } from '../ducks/privateUserDuck';
import {
  handleGetUserProfile,
  handleRequestAccessToken,
} from './handlers/privateUserHandler';

export function* watcherSaga() {
  yield takeLatest(getUser.type, handleGetUser);
  yield takeLatest(requestAccessToken.type, handleRequestAccessToken);
  yield takeLatest(getUserProfile.type, handleGetUserProfile);
}
