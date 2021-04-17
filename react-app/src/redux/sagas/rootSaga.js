import { takeLatest } from 'redux-saga/effects';
import { checkAuthCode, requestAccessToken } from '../ducks/authorizationDuck';
import {
  handleCheckAuthCode,
  handleRequestAccessToken,
} from './handlers/authorizationHandler';
import { getUser } from '../ducks/publicUserDuck';
import { handleGetUser } from './handlers/publicUserHandler';
import { getUserProfile } from '../ducks/privateUserDuck';
import { handleGetUserProfile } from './handlers/privateUserHandler';
import { getTopTracks } from '../ducks/personalizationDuck';
import { handleGetTopTracks } from './handlers/personalizationHandler';

export function* watcherSaga() {
  yield takeLatest(checkAuthCode.type, handleCheckAuthCode);
  yield takeLatest(requestAccessToken.type, handleRequestAccessToken);
  yield takeLatest(getUser.type, handleGetUser);
  yield takeLatest(getUserProfile.type, handleGetUserProfile);
  yield takeLatest(getTopTracks.type, handleGetTopTracks);
}
