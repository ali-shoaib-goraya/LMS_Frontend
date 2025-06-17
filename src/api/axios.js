import axios from 'axios';

// ✅ Fallback protection for API base URL
const getApiBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  const fallbackUrl = 'https://lms-apis-gce2c2dkg5bghwhm.eastasia-01.azurewebsites.net/api';
  
  console.log('Environment URL:', envUrl);
  console.log('All environment variables:', import.meta.env);
  console.log('Using API Base URL:', envUrl || fallbackUrl);
  
  return envUrl || fallbackUrl;
};

const API_BASE_URL = getApiBaseUrl();

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token && !config._skipAuth) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    console.log('Making request to:', config.baseURL + config.url);
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Refresh token logic
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    console.error('API Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data
    });
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        });
      }

      isRefreshing = true;
      
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        // ✅ Use direct environment variable with fallback for refresh endpoint
        const apiBaseUrl = getApiBaseUrl();
        const refreshUrl = `${apiBaseUrl}/auth/refresh`;
        
        console.log('Making refresh request to:', refreshUrl);

        const response = await axios.post(refreshUrl, {
          refreshToken: refreshToken
        }, {
          headers: {
            'Content-Type': 'application/json'
          },
          timeout: 10000
        });

        const { accessToken, refreshToken: newRefreshToken } = response.data.data || response.data;
        
        // Update stored tokens
        localStorage.setItem('access_token', accessToken);
        if (newRefreshToken) {
          localStorage.setItem('refresh_token', newRefreshToken);
        }
        
        // Process queued requests
        processQueue(null, accessToken);
        
        // Retry original request
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
        
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        
        // Clear tokens and redirect to login
        processQueue(refreshError, null);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        
        // Redirect to appropriate login page
        const currentPath = window.location.pathname;
        if (currentPath.includes('teacher') || currentPath.includes('faculty')) {
          window.location.href = '/faculty-login';
        } else {
          window.location.href = '/student-login';
        }
        
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// Export both the configured instance and the base URL getter
export default api;
export { getApiBaseUrl };