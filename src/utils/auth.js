// Authentication state management
let authState = {
  isAuthenticated: false,
  user: null
};

export const isAuthenticated = () => {
  return authState.isAuthenticated;
};

export const login = async (credentials) => {
  // TODO: Implement actual login logic with backend
  console.log('Login attempt with:', credentials);
  authState = {
    isAuthenticated: true,
    user: { username: credentials.username, role: 'admin' }
  };
  return true;
};


export const logout = async () => {
  authState = {
    isAuthenticated: false,
    user: null
  };
  return true;
};