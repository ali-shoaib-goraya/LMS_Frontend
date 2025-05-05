import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../api/axios';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize user from token on mount
  useEffect(() => { 
    const initAuth = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (token) {
          const decoded = jwtDecode(token);
          
          // Check if token is expired
          const currentTime = Date.now() / 1000;
          if (decoded.exp < currentTime) {
            await refreshToken();
          } else {
            setUser({
              UserId: decoded.UserId,
              Email: decoded.Email,
              Type: decoded.Type,
            });
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = (token, userData) => {
    setAccessToken(token);
    setUser(userData);
    localStorage.setItem('access_token', token);
  };

  const logout = () => {
    setAccessToken(null);
    setUser(null);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  };

  const refreshToken = async () => {
    try {
      const refreshTokenValue = localStorage.getItem('refresh_token');
      if (!refreshTokenValue) {
        throw new Error('No refresh token available');
      }

      const response = await api.post('/auth/refresh', {
        refreshToken: refreshTokenValue
      });

      const { accessToken: newToken } = response.data;
      setAccessToken(newToken);
      localStorage.setItem('access_token', newToken);

      const decoded = jwtDecode(newToken);
      setUser({
        UserId: decoded.UserId,
        Email: decoded.Email,
        Type: decoded.Type,
      });

      return newToken;
    } catch (error) {
      console.error('Token refresh failed:', error);
      logout();
      return null;
    }
  };

  const value = {
    accessToken,
    user,
    login,
    logout,
    refreshToken,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

