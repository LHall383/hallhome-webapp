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
import { getTopArtists, getTopTracks } from '../ducks/personalizationDuck';
import {
  handleGetTopArtists,
  handleGetTopTracks,
} from './handlers/personalizationHandler';
import { getRecentlyPlayed } from '../ducks/playerDuck';
import { handleGetRecentlyPlayed } from './handlers/playerHandler';

export function* watcherSaga() {
  // Authorization
  yield takeLatest(checkAuthCode.type, handleCheckAuthCode);
  yield takeLatest(requestAccessToken.type, handleRequestAccessToken);

  // Public User
  yield takeLatest(getUser.type, handleGetUser);

  // Private User
  yield takeLatest(getUserProfile.type, handleGetUserProfile);

  // Personalization
  yield takeLatest(getTopTracks.type, handleGetTopTracks);
  yield takeLatest(getTopArtists.type, handleGetTopArtists);

  // Player
  yield takeLatest(getRecentlyPlayed.type, handleGetRecentlyPlayed);
}
