import axios from 'axios';
import { ACCESS_TOKEN } from './constants.js';

const api = axios.create({
    // Set the base URL from environment variables
  baseURL: import.meta.env.VITE_API_URL
});

// Add a request interceptor to include the access token in headers
api.interceptors.request.use(
    (config) => {
        // Get the access token from localStorage
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
        // Attach the token to the Authorization header
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
},
    (error) => {
        // Handle request errors
    return Promise.reject(error);
}
);
export default api;