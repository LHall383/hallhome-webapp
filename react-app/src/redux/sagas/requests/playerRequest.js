import axiosInstance from '../../../utils/customAxios';

export function requestRecentlyPlayed(code, limit) {
  return axiosInstance({
    method: 'get',
    url: '/music-analysis/player/recently-played',
    params: { code, limit },
  });
}
