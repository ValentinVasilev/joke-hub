import axios, { AxiosInstance } from 'axios';
export const BASE_URL: string = 'http://localhost:3000'

// Here we can add more configurations ...
const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
