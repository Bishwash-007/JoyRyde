import axios from 'axios';

const BaseURL = 'http://192.168.1.80:4000/api';

const axiosInstance = axios.create({
  baseURL: BaseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
