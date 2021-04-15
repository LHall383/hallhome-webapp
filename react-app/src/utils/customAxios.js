import axios from 'axios';

const axiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://thehallho.me/api'
      : 'http://localhost:3001/',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
});

export default axiosInstance;
