import axiosInstance from '../../../utils/customAxios';

export function requestAccessToken(code, redirect_uri) {
  return axiosInstance({
    method: 'get',
    url: '/authCodeSubmit',
    params: { code, redirect_uri },
    responseType: 'json',
  });
}

export function requestGetUserProfile(code) {
  return axiosInstance({
    method: 'get',
    url: '/user-private',
    params: { code },
    responseType: 'json',
  });
}
