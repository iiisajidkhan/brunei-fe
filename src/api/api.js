import axios from 'axios';
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

const API_BASE_URL = "https://brunei-backend.vercel.app/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
});

api.interceptors.request.use(
  config => {
    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      Cookies.remove('token');

      Navigate('/auth/login');
    }

    return Promise.reject(error);
  },
);

export default api;
