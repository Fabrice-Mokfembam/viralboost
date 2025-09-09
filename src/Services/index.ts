import axios, {type AxiosInstance } from 'axios';

const apiClient: AxiosInstance = axios.create({
  baseURL: 'http://viral-boast-smm.pocket-gems.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export { apiClient };
