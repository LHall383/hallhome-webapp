import axiosInstance from '../../../utils/customAxios';

export function requestRecentlyPlayed(code, limit) {
  return axiosInstance({
    method: 'get',
    url: '/player/recentlyPlayed',
    params: { code, limit },
  });
}
