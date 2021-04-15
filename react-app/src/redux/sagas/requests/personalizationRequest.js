import axiosInstance from '../../../utils/customAxios';

export function requestGetTopTracks(code, time_range, limit, offset) {
  return axiosInstance({
    method: 'get',
    url: '/top-tracks',
    params: { code, time_range, limit, offset },
  });
}
