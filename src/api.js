import axios from 'axios';

//Base URL for backend API
const API = axios.create({
    baseURL: 'https://localhost:7244/api',
});

// Attach the Authorization header for secured routes
API.interceptors.request.use((req) => {
    token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

API.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401 && error.config && !error.config._retry) {
            error.config._retry = true;
            await refreshAccessToken();
            return API(error.config);
        }
        return Promise.reject(error);
    }
);


export default API;

