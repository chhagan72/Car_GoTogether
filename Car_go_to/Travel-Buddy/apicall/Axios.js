// src/api/axiosInstance.js

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL:
    'https://9367-2401-4900-531e-3765-213b-7ea5-11e2-1375.ngrok-free.app/api/auth/', // Replace with your API's base URL
  timeout: 10000, // Set a timeout if needed
  headers: {
    'Content-Type': 'application/json',
    // Add any other headers you want globally, like Authorization tokens
  },
});

// You can also set up interceptors here if needed
axiosInstance.interceptors.request.use(
  config => {
    // You can modify the request before it is sent, like adding authorization tokens
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    // Handle global errors like network issues
    return Promise.reject(error);
  },
);

export default axiosInstance;
