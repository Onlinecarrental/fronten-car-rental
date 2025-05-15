import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, type }) => {
  const location = useLocation();
  const userStr = localStorage.getItem('user');

  // If no user data, redirect to login
  if (!userStr) {
    return <Navigate to="/" replace />;
  }

  try {
    const userData = JSON.parse(userStr);
    
    // Check if user has role and it matches
    if (userData && userData.role === type) {
      return children;
    }

    // If role doesn't match, redirect to appropriate page
    if (userData.role === 'customer') {
      return <Navigate to="/home" replace />;
    } else if (userData.role === 'agent') {
      return <Navigate to="/agent" replace />;
    }

    // If no valid role, redirect to login
    return <Navigate to="/" replace />;

  } catch (error) {
    console.error('Auth Error:', error);
    return <Navigate to="/" replace />;
  }
};

export default ProtectedRoute;