import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
});

console.log('API Base URL:', import.meta.env.VITE_API_BASE_URL);

// Request interceptor
api.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token');
  if (token && !config._skipAuth) { // Skip auth for refresh endpoint
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Refresh token logic
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => error ? prom.reject(error) : prom.resolve(token));
  failedQueue = [];
};

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        });
      }

      isRefreshing = true;
      try {
        // ✅ Use environment variable directly for refresh call
        const refreshUrl = `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`;
        
        const { data } = await axios.post(refreshUrl, {
          refreshToken: localStorage.getItem('refresh_token')
        }, {
          _skipAuth: true // Prevent token attachment
        });

        localStorage.setItem('access_token', data.accessToken);
        processQueue(null, data.accessToken);
        
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/student-login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;