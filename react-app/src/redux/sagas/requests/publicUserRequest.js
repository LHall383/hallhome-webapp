import axiosInstance from '../../../utils/customAxios';

export function requestGetUser(username) {
  return axiosInstance({
    method: 'get',
    url: '/music-analysis/profile/public',
    params: { username },
  });
}
