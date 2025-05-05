import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7244/api',
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

api.interceptors.response.use(
  res => res,
  async err => {
    const originalRequest = err.config;
    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers.Authorization = 'Bearer ' + token;
          return api(originalRequest);
        }).catch(error => Promise.reject(error));
      }
    
      isRefreshing = true;
      try {
        const refreshResponse = await axios.post('https://localhost:7244/api/auth/refresh', {
          refreshToken: localStorage.getItem('refresh_token'),
        });

        const newToken = refreshResponse.data.accessToken;
        localStorage.setItem('access_token', newToken);
        processQueue(null, newToken);

        originalRequest.headers.Authorization = 'Bearer ' + newToken;
        return api(originalRequest);
      } catch (error) {
        processQueue(error, null);
        // Instead of directly redirecting, we could emit an event that the auth context listens to
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/student-login';
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(err);
  }
);

export default api;