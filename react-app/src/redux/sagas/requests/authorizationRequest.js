import axiosInstance from '../../../utils/customAxios';

export function requestAccessToken(code, redirect_uri) {
  return axiosInstance({
    method: 'get',
    url: '/authCodeSubmit',
    params: { code, redirect_uri },
  });
}

export function checkAuthCode(code) {
  return axiosInstance({
    method: 'get',
    url: '/auth/isCodeValid',
    params: { code },
  });
}