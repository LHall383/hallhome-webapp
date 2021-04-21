import { call, put } from 'redux-saga/effects';
import { setTopArtists, setTopTracks } from '../../ducks/personalizationDuck';
import {
  requestGetTopArtists,
  requestGetTopTracks,
} from '../requests/personalizationRequest';

export function* handleGetTopTracks(action) {
  try {
    const { code, time_range, limit, offset } = action.payload;
    const response = yield call(
      requestGetTopTracks,
      code,
      time_range,
      limit,
      offset,
    );
    const { data } = response;
    yield put(setTopTracks(data));
  } catch (error) {
    console.log(error);
  }
}

export function* handleGetTopArtists(action) {
  try {
    const { code, time_range, limit, offset } = action.payload;
    const response = yield call(
      requestGetTopArtists,
      code,
      time_range,
      limit,
      offset,
    );
    const { data } = response;
    yield put(setTopArtists(data));
  } catch (error) {
    console.log(error);
  }
}
