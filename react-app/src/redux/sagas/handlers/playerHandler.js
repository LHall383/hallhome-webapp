import { call, put } from 'redux-saga/effects';
import { setRecentlyPlayed } from '../../ducks/playerDuck';
import { requestRecentlyPlayed } from '../requests/playerRequest';

export function* handleGetRecentlyPlayed(action) {
  try {
    const { code, limit } = action.payload;
    const response = yield call(requestRecentlyPlayed, code, limit);
    const { data } = response;
    yield put(setRecentlyPlayed(data));
  } catch (error) {
    console.log(error);
  }
}
