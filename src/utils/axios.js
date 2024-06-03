// src/utils/axios.js
import axios from 'axios';
import { SERVER_URL } from '../config';

const axiosInstance = axios.create({
    // Optional: Set common config like baseURL
    baseURL: SERVER_URL
});

export const setAuthToken = token => {
    if (token) {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axiosInstance.defaults.headers.common['Authorization'];
    }
};

export default axiosInstance;
