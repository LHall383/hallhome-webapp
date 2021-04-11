import { call, put } from 'redux-saga/effects';
import { setTopTracks } from '../../ducks/personalizationDuck';
import { requestGetTopTracks } from '../requests/personalizationRequest';

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
