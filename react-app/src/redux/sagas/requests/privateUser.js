import axios from 'axios';

export function requestLoginUser() {
  return axios({
    method: 'get',
    url: '/login',
    responseType: 'json',
  });
}
