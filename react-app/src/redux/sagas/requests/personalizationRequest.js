import axiosInstance from '../../../utils/customAxios';

export function requestGetTopTracks(code, time_range, limit, offset) {
  return axiosInstance({
    method: 'get',
    url: '/music-analysis/top/tracks',
    params: { code, time_range, limit, offset },
  });
}

export function requestGetTopArtists(code, time_range, limit, offset) {
  return axiosInstance({
    method: 'get',
    url: '/music-analysis/top/artists',
    params: { code, time_range, limit, offset },
  });
}
