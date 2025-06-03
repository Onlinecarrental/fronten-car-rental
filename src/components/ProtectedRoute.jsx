import React, { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

const ProtectedRoute = ({ children, type }) => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const userStr = localStorage.getItem('user');
        if (userStr) {
          try {
            const userData = JSON.parse(userStr);
            setUserRole(userData.role);
            setIsAuthenticated(true);
          } catch (error) {
            console.error('Error parsing user data:', error);
            setIsAuthenticated(false);
            localStorage.removeItem('user');
          }
        } else {
          setIsAuthenticated(false);
        }
      } else {
        // User is signed out
        setIsAuthenticated(false);
        setUserRole(null);
        localStorage.removeItem('user');
      }
      setLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  // Show loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Role-based access control
  const roleRoutes = {
    customer: '/home',
    agent: '/agent',
    admin: '/admin'
  };

  // Check if user has required role
  if (userRole !== type) {
    // Redirect to appropriate page based on role
    const redirectPath = roleRoutes[userRole] || '/';
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  // User is authenticated and has correct role
  return children;
};

export default ProtectedRoute;