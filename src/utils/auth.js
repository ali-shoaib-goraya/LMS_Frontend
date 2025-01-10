import API from '../api';

// Handle user registration
const handleRegister = async (email, password, confirmPassword) => {
    try {
        const { data } = await API.post('/auth/register', { email, password, confirmPassword });
        alert(data.message);
    } catch (error) {
        console.error(error.response?.data?.errors || error.message);
        alert('Registration failed!');
    }
};

// Handle user login
const handleLogin = async (username, password) => {
    try {
        const { data } = await API.post('/auth/login', { username, password });
        // Save tokens in local storage
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        console.log('Login successful!');
    } catch (error) {
        console.error(error.response?.data?.message || error.message);
        alert('Login failed!');
    }
};

// Handle user logout
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

// Export functions
export { handleRegister, handleLogin, handleLogout };
