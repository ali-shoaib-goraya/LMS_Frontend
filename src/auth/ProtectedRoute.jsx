import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const { accessToken, user, loading } = useAuth();
  
  if (loading) {
    // You could return a loading spinner here
    return <div>Loading...</div>;
  }
  
  if (!accessToken) {
    return <Navigate to="/student-login" />;
  }
  
  // Optional: Add role-based protection
  // For example, only allow Faculty/CampusAdmin to access admin routes
  // const path = window.location.pathname;
  // if (path.startsWith('/dashboard') && user?.Type !== 'CampusAdmin' && user?.Type !== 'Faculty') {
  //   return <Navigate to="/" />;
  // }
  
  return children;
};

export default ProtectedRoute;