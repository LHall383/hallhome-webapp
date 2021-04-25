import axiosInstance from '../../../utils/customAxios';

export function requestAccessToken(code, redirect_uri) {
  return axiosInstance({
    method: 'get',
    url: '/music-analysis/auth/submit-code',
    params: { code, redirect_uri },
  });
}

export function checkAuthCode(code) {
  return axiosInstance({
    method: 'get',
    url: '/music-analysis/auth/is-code-valid',
    params: { code },
  });
}
