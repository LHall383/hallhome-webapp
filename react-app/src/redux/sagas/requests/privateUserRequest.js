import axiosInstance from '../../../utils/customAxios';

export function requestGetUserProfile(code) {
  return axiosInstance({
    method: 'get',
    url: '/user-private',
    params: { code },
  });
}
