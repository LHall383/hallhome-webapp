import axiosInstance from '../../../utils/customAxios';

export function requestGetUser(username) {
  return axiosInstance({
    method: 'get',
    url: '/user-public',
    params: { username },
  });
}
