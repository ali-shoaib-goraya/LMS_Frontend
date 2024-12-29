
import API from '../api'; // Your Axios instance

const handleRegister = async (email, password, confirmPassword) => {
  try {
      const { data } = await API.post('/auth/register', { email, password, confirmPassword });
      alert(data.message);
  } catch (error) {
      console.error(error.response?.data?.errors || error.message);
      alert('Registration failed!');
  }
};

const handleLogin = async (username, password) => {
    try {
        const { data } = await API.post('/auth/login', { username, password });
        // Save tokens or user data in local storage
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
    } catch (error) {
        // Throw error for the calling function to handle
        throw new Error(
            error.response?.data?.message || 'An error occurred during login'
        );
    }
};

const handleLogout = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  try {
      const { data } = await API.post('/auth/logout', { refreshToken });
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      alert(data.message);
  } catch (error) {
      console.error(error.response?.data?.message || error.message);
      alert('Logout failed!');
  }
};

const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  try {
      const { data } = await API.post('/auth/refresh', { token: refreshToken });
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      console.log('Token refreshed successfully!');
  } catch (error) {
      console.error(error.response?.data?.message || error.message);
      alert('Session expired. Please log in again.');
  }
};


export { handleRegister, handleLogin, handleLogout, refreshAccessToken };

