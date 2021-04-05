import axios from 'axios';

export function requestGetUser(username) {
  return axios({
    method: 'get',
    url: '/user-public',
    params: { username },
    responseType: 'json',
  });
}
