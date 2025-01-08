import axios from 'axios';

// Base URL for backend API
const API = axios.create({
    baseURL: 'http://localhost:5188/api',
    headers: {
        'Content-Type': 'application/json', // Ensure all requests use JSON
    },
});

// Attach the Authorization header for secured routes
API.interceptors.request.use(
    (req) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            req.headers.Authorization = `Bearer ${token}`;
        }
        return req;
    },
    (error) => Promise.reject(error)
);

// Handle response errors and token refresh
API.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                // Refresh token
                await refreshAccessToken();
                originalRequest.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
                return API(originalRequest); // Retry the failed request
            } catch (refreshError) {
                console.error('Token refresh failed:', refreshError);
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login'; // Redirect to login
            }
        }

        // General error logging
        if (error.response) {
            console.error(`API Error: ${error.response.status} - ${error.response.data?.message || 'Unknown error'}`);
        } else {
            console.error(`Network Error: ${error.message}`);
        }

        return Promise.reject(error);
    }
);

export default API;

// Token refresh function
const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
        throw new Error('No refresh token available');
    }

    try {
        const { data } = await axios.post(`${API.defaults.baseURL}/auth/refresh`, {
            token: refreshToken,
        });
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        console.log('Token refreshed successfully!');
    } catch (error) {
        console.error('Failed to refresh token:', error.response?.data?.message || error.message);
        throw error;
    }
};
