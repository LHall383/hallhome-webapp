import axiosInstance from '../../../utils/customAxios';

export function requestGetUserProfile(code) {
  return axiosInstance({
    method: 'get',
    url: '/music-analysis/profile/private',
    params: { code },
  });
}
